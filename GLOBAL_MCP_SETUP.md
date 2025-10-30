# Global MCP Server Setup Guide

This guide documents the global MCP (Model Context Protocol) servers configured on your system, available across all projects.

## 🌟 Current Global MCP Servers

### ✅ **1. Sequential Thinking Server**
- **Name**: `global-sequential-thinking`
- **Purpose**: Enhanced problem-solving and sequential thinking capabilities
- **Command**: `npx @modelcontextprotocol/server-sequential-thinking`
- **Status**: ✅ Connected and Working
- **Scope**: Global (available in all projects)
- **Use Case**: Breaking down complex problems into step-by-step solutions

### ⚠️ **2. Figma Server**
- **Name**: `figma`
- **Purpose**: Figma design integration and file management
- **URL**: `https://mcp.figma.com/mcp` (HTTP transport)
- **Status**: ⚠ Connected (Needs Authentication)
- **Scope**: Global (available in all projects)
- **Use Case**: Accessing and manipulating Figma designs and components
- **Authentication**: OAuth with Figma account required

## 📋 MCP Server Management

### **Check Current Status**
```bash
# List all MCP servers (global + project-specific)
claude mcp list

# Quick status check
/mcp
```

### **Add New Global Servers**
```bash
# Add a server globally (available in all projects)
claude mcp add --transport stdio --scope user <server-name> <command>

# Example:
claude mcp add --transport stdio --scope user my-tool npx some-mcp-server
```

### **Remove Global Servers**
```bash
# Remove a global server
claude mcp remove <server-name>
```

### **Add Project-Specific Servers**
```bash
# Add server only to current project
claude mcp add --transport stdio <server-name> <command>
```

## 🗂️ Configuration File Locations

### **Global Configuration**
- **File**: `~/.claude.json`
- **Scope**: Affects all projects
- **Current Global Servers**: 1 working server

### **Project Configuration**
- **File**: `.mcp.json` (in project directory)
- **Scope**: Affects only current project
- **Current Project Servers**: 1 server (`sequential-thinking`)

## 🛠️ Available MCP Commands

```bash
# Management Commands
claude mcp list                    # List all servers
claude mcp get <server-name>       # Get server details
claude mcp remove <server-name>    # Remove a server

# Authentication (for OAuth servers)
/mcp                               # Open authentication dialog

# Help
claude mcp --help                  # Show all available options
```

## 📊 Server Status Legend

- ✅ **Connected**: Server is running and available
- ✗ **Failed to connect**: Server couldn't start (missing deps, config, etc.)
- ⚠️ **Warning**: Server running with issues

## 🎯 Recommended Global Servers for Future Setup

### **Development Tools**
- **Git MCP Server**: Enhanced Git operations
- **Filesystem MCP**: Secure file operations
- **Fetch MCP**: Enhanced web content retrieval

### **Database Tools**
- **PostgreSQL MCP**: Database operations (requires DB setup)
- **SQLite MCP**: Local database management

### **Productivity Tools**
- **Memory MCP**: Knowledge graph for persistent context
- **Calendar MCP**: Schedule management
- **Note-taking MCP**: Integration with note apps

## 🔧 Troubleshooting

### **Server Failed to Connect**
1. **Check Dependencies**: Ensure required packages are installed
2. **Environment Variables**: Some servers need API keys or configuration
3. **Permissions**: Check if the server has necessary access

### **Common Issues**
```bash
# Check if package is installed
npm list -g @modelcontextprotocol/server-name

# Reinstall server
npm install -g @modelcontextprotocol/server-name

# Check global configuration
claude mcp get server-name
```

## 🚀 Best Practices

### **Server Management**
1. **Start Small**: Begin with essential servers only
2. **Test Thoroughly**: Verify each server works before adding more
3. **Monitor Performance**: Remove unused servers to maintain speed
4. **Scope Appropriately**: Use global for universal tools, project-specific for specialized needs

### **Security**
1. **Limit Access**: Only grant necessary permissions
2. **Secure Environment Variables**: Use secure storage for API keys
3. **Review Regularly**: Periodically check and remove unused servers

### **Configuration**
1. **Backup Settings**: Keep copies of working configurations
2. **Document Changes**: Track what servers you add and why
3. **Version Control**: Consider committing `.mcp.json` for project-specific servers

## 🔐 Figma Server Authentication

The Figma MCP server requires OAuth authentication to access your Figma designs:

### **Steps to Authenticate:**
1. **Open Authentication Dialog**: Run `/mcp` in Claude Code
2. **Select Figma Server**: Choose the `figma` server from the list
3. **Sign in to Figma**: Use your Figma account credentials
4. **Grant Permissions**: Allow necessary access to your designs and files
5. **Verify Connection**: Server status will change from ⚠ to ✅

### **Required Permissions:**
- Read access to your Figma files
- Design file manipulation
- Component access
- Team file access (if applicable)

### **Figma Features Available:**
- **Design File Access**: Browse and access your Figma files
- **Component Extraction**: Get design components and assets
- **Style Information**: Access colors, typography, and design tokens
- **File Manipulation**: Create, read, update design files
- **Collaboration Features**: Access team libraries and shared components

### **Troubleshooting:**
- If authentication fails, try removing and re-adding the server
- Ensure you have the necessary permissions in your Figma account
- Check that your Figma account has active team/file access
- Some features may require Figma Professional or Team plan

## 📈 Future Enhancements

### **Planned Additions**
- **GitHub MCP**: Repository management and automation
- **Netlify MCP**: Deployment and site management
- **Database MCPs**: Various database integrations
- **Cloud MCPs**: AWS, Azure, GCP integrations

### **Custom Servers**
You can create custom MCP servers using:
```bash
# Install MCP SDK
npm install @modelcontextprotocol/sdk

# Create custom server
npx @modelcontextprotocol/create-server my-custom-server
```

## 📚 Additional Resources

- **Official Documentation**: https://docs.claude.com/en/docs/claude-code/mcp
- **MCP Server Repository**: https://github.com/modelcontextprotocol/servers
- **Community Examples**: Search GitHub for `mcp-server` examples

---

**Last Updated**: 2025-10-30
**Working Global Servers**: 1 (1 ready, 1 needs auth)
**Total Configured**: 3 (2 global + 1 project-specific)