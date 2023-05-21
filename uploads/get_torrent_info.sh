#!/bin/bash

password="password"
ssh_destination="popam@192.168.0.138"

sshpass -p "$password" ssh "$ssh_destination" "./get_torrent_info.sh"
sshpass -p "$password" ssh "$ssh_destination" "exit"


# sudo timeout 15s bash get_torrent_info.sh