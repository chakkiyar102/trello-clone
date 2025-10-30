# MCP (Model Context Protocol) Setup Guide

A comprehensive guide to setting up MCP servers for enhanced development workflows.

## 🎯 What is MCP?

MCP (Model Context Protocol) is a standardized way for AI applications to connect with external tools and data sources. Think of it as a "USB-C port for AI" that allows seamless integration with various services and APIs.

## 📋 Current MCP Status

Your current status: **No MCP servers configured** ✅
This is normal and gives you full control with built-in tools.

## 🚀 Getting Started with MCP

### Step 1: Check Current Status
```bash
/mcp                    # Check configured servers
claude mcp list         # List all servers
```

### Step 2: Choose Your MCP Servers

#### **Recommended Starting Servers:**

1. **Git MCP Server** - Enhanced Git operations
2. **Filesystem MCP Server** - Advanced file operations
3. **Fetch MCP Server** - Enhanced web content retrieval
4. **Memory MCP Server** - Knowledge graph for persistent context

### Step 3: Installation Methods

#### **Method A: HTTP Servers (Recommended for Cloud Services)**
```bash
# Add an HTTP-based MCP server
claude mcp add --transport http <server-name> <server-url>
```

#### **Method B: Local Stdio Servers (For Local Tools)**
```bash
# Add a local MCP server
claude mcp add --transport stdio <server-name> <command> [args...]
```

#### **Method C: NPM Package Installation**
```bash
# Install MCP server package
npm install @modelcontextprotocol/server-{name}

# Add the server
claude mcp add --transport stdio <name> npx @modelcontextprotocol/server-{name}
```

## 🛠️ Practical MCP Server Setup

### **1. Git Enhanced Operations**
```bash
# Install Git MCP server
npm install -g @modelcontextprotocol/server-git

# Add to Claude
claude mcp add --transport stdio git npx @modelcontextprotocol/server-git /path/to/your/project
```

### **2. Filesystem Operations**
```bash
# Install Filesystem MCP server
npm install -g @modelcontextprotocol/server-filesystem

# Add to Claude (secure file operations)
claude mcp add --transport stdio filesystem npx @modelcontextprotocol/server-filesystem /allowed/path
```

### **3. Memory/Knowledge Management**
```bash
# Install Memory MCP server
npm install -g @modelcontextprotocol/server-memory

# Add to Claude
claude mcp add --transport stdio memory npx @modelcontextprotocol/server-memory
```

### **4. Enhanced Web Fetching**
```bash
# Install Fetch MCP server
npm install -g @modelcontextprotocol/server-fetch

# Add to Claude
claude mcp add --transport stdio fetch npx @modelcontextprotocol/server-fetch
```

## 📊 Scopes and Configuration

### **Scope Levels:**
- **Local**: Private to current session
- **Project**: Shared via `.mcp.json` file
- **User**: Available across all projects

### **Project-Specific Configuration:**
Create a `.mcp.json` file in your project root:
```json
{
  "mcpServers": {
    "git": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-git", "."],
      "env": {
        "GIT_CONFIG_GLOBAL": "/path/to/.gitconfig"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-filesystem", "/allowed/path"]
    }
  }
}
```

## 🔧 Management Commands

```bash
# List all configured servers
claude mcp list

# Get server details
claude mcp get <server-name>

# Remove a server
claude mcp remove <server-name>

# Update server configuration
claude mcp add --transport stdio <name> <new-command>
```

## 🔐 Authentication

For OAuth 2.0 protected servers:
1. Use `/mcp` command in Claude Code
2. Follow the authentication flow
3. Grant necessary permissions

## 🌐 Environment Variables

Set environment variables for MCP servers:

```bash
# Method 1: Command line
claude mcp add --transport stdio my-server npx server-package --env API_KEY=your_key

# Method 2: Configuration file
{
  "mcpServers": {
    "my-server": {
      "command": "npx",
      "args": ["server-package"],
      "env": {
        "API_KEY": "${API_KEY}",
        "DATABASE_URL": "${DATABASE_URL}"
      }
    }
  }
}
```

## 🎯 Useful MCP Servers for Development

### **For Web Development:**
- **Git MCP** - Advanced repository management
- **Filesystem MCP** - Secure file operations
- **Memory MCP** - Project context memory

### **For Database Projects:**
- **PostgreSQL MCP** - Database operations
- **SQLite MCP** - Local database management
- **Redis MCP** - Cache management

### **For Cloud/DevOps:**
- **AWS MCP** - Cloud resource management
- **Azure MCP** - Microsoft cloud services
- **Bitrise MCP** - CI/CD pipeline management

### **For Data Science:**
- **Pandas MCP** - Data manipulation
- **Alpaca MCP** - Financial data and trading

## 🚨 Security Considerations

1. **Scope Limitations**: Only grant necessary permissions
2. **Environment Variables**: Use secure storage for sensitive data
3. **Filesystem Access**: Limit to specific directories
4. **Network Access**: Be cautious with external API access

## 🔄 Workflow Integration

### **Before MCP (Current Workflow):**
- Manual Git commands
- Direct file system access
- Built-in web browsing
- Terminal commands

### **After MCP (Enhanced Workflow):**
- Natural language Git operations
- Context-aware file management
- Enhanced API integrations
- Persistent project memory

## 📈 Benefits of MCP

1. **Natural Language Interface**: Control services with conversational commands
2. **Context Awareness**: Servers understand project context
3. **Integration**: Seamless connection with external services
4. **Extensibility**: Easy to add new capabilities
5. **Security**: Controlled access to external resources

## 🎯 When to Use MCP

**Use MCP when you want to:**
- Automate repetitive development tasks
- Integrate with external APIs naturally
- Maintain persistent project context
- Use advanced data processing capabilities
- Enhance collaboration workflows

**Stick to built-in tools when:**
- Working on simple projects
- Need full control over operations
- Want minimal setup complexity
- Are learning development workflows

## 🚀 Next Steps

1. **Start Simple**: Begin with one or two essential servers
2. **Test Thoroughly**: Verify each server works as expected
3. **Gradually Expand**: Add more servers as needed
4. **Monitor Performance**: Ensure servers don't slow down your workflow
5. **Stay Updated**: MCP ecosystem is rapidly evolving

## 📚 Resources

- **Official Documentation**: https://docs.claude.com/en/docs/claude-code/mcp
- **MCP Servers Repository**: https://github.com/modelcontextprotocol/servers
- **Community Examples**: Check GitHub for community-built servers

---

**💡 Pro Tip**: Start with the Git and Filesystem MCP servers to enhance your current development workflow, then gradually add more specialized servers as your projects grow in complexity.