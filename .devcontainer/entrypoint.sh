#!/bin/bash
groupadd -g "${GID}" "${GNAME}"
useradd -m -u "${UID}" -g "${GID}" -s /bin/bash "${UNAME}"
while sleep 1000; do :; done