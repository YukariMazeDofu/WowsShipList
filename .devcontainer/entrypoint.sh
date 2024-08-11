#!/bin/bash
groupadd -g "${GID}" "${GNAME}"
useradd -m -u "${UID}" -g "${GID}" -s /bin/bash "${UNAME}"
chown "${UID}:${GID}" "${DENO_DIR}"
while sleep 1000; do :; done