// controllers/roleController.js
const RoleService = require('../services/roleService');

const getRoles = async (req, res) => {
    try {
        const roles = await RoleService.getRoles();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getRoleById = async (req, res) => {
    try {
        const role = await RoleService.getRoleById(req.params.id);
        if (role) {
            res.json(role);
        } else {
            res.status(404).json({ error: 'Role not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createRole = async (req, res) => {
    try {
        const role = await RoleService.createRole(req.body);
        res.status(201).json(role);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateRole = async (req, res) => {
    try {
        const role = await RoleService.getRoleById(req.params.id);
        if (role) {
            await RoleService.updateRole(role, req.body);
            res.json(role);
        } else {
            res.status(404).json({ error: 'Role not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteRole = async (req, res) => {
    try {
        const role = await RoleService.getRoleById(req.params.id);
        if (role) {
            await RoleService.deleteRole(role);
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Role not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
};