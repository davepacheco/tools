#!/usr/sbin/dtrace -s

node*:::gc-start
{
	self->start = timestamp;
}

node*:::gc-done
/self->start/
{
	@["nanoseconds"] = quantize(timestamp - self->start);
	self->start = 0;
}
