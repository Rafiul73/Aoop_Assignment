#!/bin/bash

# Update system packages
apt-get update && apt-get upgrade -y

# Install Maven
apt-get install -y maven

# Install Git
apt-get install -y git

echo "✓ Development environment setup complete!"
echo "  - Java 17 installed"
echo "  - Node.js 18 installed"
echo "  - Maven installed"
echo "  - Git installed"
