#!/bin/bash

for i in $(grep -rls --exclude-dir={dist,node_modules,data} "Error"); do
	nvim -c "%s/Error/Exception/gc" -c "wq" "$i"
done
