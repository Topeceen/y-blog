### 生成 ssh

- win10 以上版本，在控制台输入自己的邮箱

```shell
ssh-keygen -t rsa -b 4096 -C "自己的邮箱"
ssh-keygen -t rsa -b 4096 -C "1274300766@qq.com"
```

- 查看公钥内容

```shell
cat ~/.ssh/id_rsa.pub
```

- 复制进需要的平台

### 在 windows 查看自己的公钥

- 打开控制台
- 导航到 ssh 目录

```shell
dir %USERPROFILE%\.ssh
```

- 查看公钥内容

```shell
type %USERPROFILE%\.ssh\id_rsa.pub
```

#### 出现找不到.ssh

- 重新生成密钥

```shell
ssh-keygen -t rsa -b 4096 -C "自己的邮箱"
ssh-keygen -t rsa -b 4096 -C "1274300766@qq.com"
```
