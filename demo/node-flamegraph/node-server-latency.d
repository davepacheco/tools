#!/usr/sbin/dtrace -s

node*:::http-server-request
{
	start[args[1]->fd] = timestamp;
}

node*:::http-server-response
/start[args[0]->fd]/
{
	@["nanoseconds"] = quantize(timestamp - start[args[0]->fd]);
	start[args[0]->fd] = 0;
}
