#!/bin/bash

file_path="$1"
destination="popam@192.168.0.138:/home/popam/Downloads"
password="password"
ssh_destination="popam@192.168.0.138"

scppass=$(which sshpass)

if [ ! -x "$scppass" ]; then
  echo "Please install 'sshpass' to use this script."
  exit 1
fi

"$scppass" -p "$password" scp "$file_path" "$destination"

sshpass -p "$password" ssh "$ssh_destination" "cd ~"
sshpass -p "$password" ssh "$ssh_destination" "./add_torrent.sh $file_path"

# deluge-console add ...
# deluge-console -c .config/deluge/ 
# opens the cli gui for deluge

# sudo pkill -i deluged

# the path to the state file
# ~/.config/deluge/state
