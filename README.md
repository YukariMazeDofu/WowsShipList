# Wows Ship List

## 概要

クランに所属しているメンバの船一覧を WG API を使用して作成する。
他者への公開を前提としていない、雑な内容なのであまり参考にしないでください。

## 使用法

```shell
cp workspace/settings.default.toml workspace/settings.toml
vi workspace/settings.toml
docker compose up
```

## 開発

devcontainer を使用しており、docker をインストールした WSL2 環境を前提としています。
docker がインストールされていれば uid, gid の調整で動作すると思います。
