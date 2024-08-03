#!/bin/bash
groupadd -g "${GID}" "${GNAME}"
useradd -m -u "${UID}" -g "${GID}" -s /bin/bash "${UNAME}"
chown "${UID}:${GID}" /deno-dir
while sleep 1000; do :; done