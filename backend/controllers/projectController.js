const Project = require('../models/Project');

// GET all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json({ projects });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE new project
exports.createProject = async (req, res) => {
  try {
    const { title, bodyText, links, tags } = req.body;
    let image = req.file ? req.file.path : null;

    // Convert links and tags from comma separated strings to arrays
    const linksArray = links ? JSON.parse(links) : [];
    const tagsArray = tags ? JSON.parse(tags) : [];

    const newProject = await Project.create({
      title,
      bodyText,
      image,
      links: linksArray,
      tags: tagsArray
    });

    res.status(201).json(newProject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// UPDATE project
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, bodyText, links, tags } = req.body;
    let image = req.file ? req.file.path : null;

    const project = await Project.findByPk(id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    project.title = title || project.title;
    project.bodyText = bodyText || project.bodyText;
    project.links = links ? JSON.parse(links) : project.links;
    project.tags = tags ? JSON.parse(tags) : project.tags;
    if (image) project.image = image;

    await project.save();
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE project
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    await project.destroy();
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
