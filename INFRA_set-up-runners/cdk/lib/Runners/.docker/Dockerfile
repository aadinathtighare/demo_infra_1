
# Use latest Node 22 LTS (Debian slim)
FROM node:22-bullseye-slim

# -------------------------------
# Versions (easily overridable)
# -------------------------------
ARG TINI_VERSION=v0.19.0
# NOTE: v13.6.0 is very old; update to your target GitLab Runner version.
# You can bump this to a recent stable (e.g., v16.x / v17.x) as per your environment.
ARG GITLAB_RUNNER_VERSION=v16.11.0

ENV DEBIAN_FRONTEND=noninteractive \
    PATH="/usr/local/bin:${PATH}"

# ---------------------------------------------------------------------
# Install system deps (curl, unzip, ca-certificates, sshd) + tini
# ---------------------------------------------------------------------
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      ca-certificates curl unzip openssh-server gnupg \
 && mkdir -p /var/run/sshd \
 # Install Tini (proper signal handling/zombie reaping)
 && curl -fsSL -o /usr/local/bin/tini \
      "https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini-amd64" \
 && chmod +x /usr/local/bin/tini \
 # Clean up apt cache
 && rm -rf /var/lib/apt/lists/*

EXPOSE 22

# ---------------------------------------------------------------------
# Install AWS CLI v2
# ---------------------------------------------------------------------
RUN curl -fsSL "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o /tmp/awscliv2.zip \
 && unzip -q /tmp/awscliv2.zip -d /tmp \
 && /tmp/aws/install \
 && rm -rf /tmp/aws /tmp/awscliv2* 

# ---------------------------------------------------------------------
# Install GitLab Runner binary
# (adjust version via ARG above)
# ---------------------------------------------------------------------
RUN curl -fsSL -o /usr/local/bin/gitlab-runner \
      "https://gitlab-runner-downloads.s3.amazonaws.com/${GITLAB_RUNNER_VERSION}/binaries/gitlab-runner-linux-amd64" \
 && chmod +x /usr/local/bin/gitlab-runner

# ---------------------------------------------------------------------
# Install Git LFS
# ---------------------------------------------------------------------
RUN curl -fsSL https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | bash \
 && apt-get update && apt-get install -y --no-install-recommends git-lfs \
 && git lfs install --skip-repo \
 && rm -rf /var/lib/apt/lists/*

# ---------------------------------------------------------------------
# Copy entrypoint
# ---------------------------------------------------------------------
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Use tini as PID 1 for clean signal handling in ECS/Fargate
ENTRYPOINT ["tini", "--", "/usr/local/bin/docker-entrypoint.sh"]
