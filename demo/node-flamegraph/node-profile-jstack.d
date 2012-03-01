#!/usr/sbin/dtrace -s

profile-997
/execname == "node"/
{
	@[ jstack(100, 4096) ] = count();
}

END
{
	trunc(@, 10);
}
