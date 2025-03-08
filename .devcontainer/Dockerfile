# ベースイメージを指定
FROM node:22.14.0

# 作業ディレクトリを設定
WORKDIR /workspace

# 必要なパッケージをインストール
RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    sudo \  
    # ここにsudoを追加
    && rm -rf /var/lib/apt/lists/*

# ユーザーを作成
ARG USERNAME=node
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN if ! getent group $USERNAME; then groupadd --gid $USER_GID $USERNAME; fi \
    && if ! id -u $USERNAME > /dev/null 2>&1; then useradd --uid $USER_UID --gid $USER_GID -m $USERNAME; fi \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# ユーザーを変更
USER $USERNAME

# プロジェクトファイルをコピー
COPY . /workspace