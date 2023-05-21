#!/bin/bash
# TODO delete certain torrents
password="password"
ssh_destination="popam@192.168.0.138"

sshpass -p "$password" ssh "$ssh_destination" "sudo rm ~/.config/deluge/state/*.torrent"
sshpass -p "$password" ssh "$ssh_destination" "sudo rm ~/.config/deluge/state/torrents.fastresume"
sshpass -p "$password" ssh "$ssh_destination" "sudo rm ~/.config/deluge/state/torrents.state"

sshpass -p "$password" ssh "$ssh_destination" "sudo pkill -i deluged"

sshpass -p "$password" ssh "$ssh_destination" "deluged"