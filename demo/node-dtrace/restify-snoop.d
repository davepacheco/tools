#!/usr/sbin/dtrace -s
#pragma D option quiet
#pragma D option aggpack
#pragma D option aggsortkey

restify*:::route-start
{
   track[arg2] = timestamp;
   printf("-> %6u  %s\n", arg2, copyinstr(arg1));
}

restify*:::handler-start
/track[arg3]/
{
   printf("  -> %6u  %15s %s\n", arg3, copyinstr(arg1), copyinstr(arg2));
   h[arg3, copyinstr(arg2)] = timestamp;
}

restify*:::handler-done
/track[arg3] && h[arg3, copyinstr(arg2)]/
{
   printf("  <- %6u  %15s %s (%d us)\n", arg3, copyinstr(arg1), copyinstr(arg2),
      (timestamp - h[arg3, copyinstr(arg2)]) / 1000);
   h[arg3, copyinstr(arg2)] = 0;
}

restify*:::route-done
/track[arg2]/
{
   printf("<- %6u  %s (%d us)\n", arg2, copyinstr(arg1),
      (timestamp - track[arg2]) / 1000);
   track[arg2] = 0;
}
