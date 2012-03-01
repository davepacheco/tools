#!/usr/sbin/dtrace -s

#pragma D option quiet

node*:::http-server-request
{
	printf("%4s  %s\n", args[0]->method, args[0]->url);
}
