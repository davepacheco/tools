#!/usr/sbin/dtrace -s

profile-997
/execname == "node"/
{
	@[ ustack() ] = count();
}

END
{
	trunc(@, 10);
}
