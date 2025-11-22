import React, { useState, useEffect } from 'react';
import Header from './Header';
import HeaderDash from './HeaderDash';
import styled from 'styled-components';

// Styled section wrapper (like Dashboard)
const Section = styled.div`
  margin-bottom: 30px;

  label {
    display: block;
    margin-bottom: 5px;
    color: ${({ theme }) => theme.accentColor};
    font-weight: 500;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 10px 12px;
    margin-bottom: 10px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.inputBorder};
    background-color: ${({ theme }) => theme.inputBg};
    color: ${({ theme }) => theme.inputText};
    transition: all 0.3s ease;

    &::placeholder {
      color: ${({ theme }) => theme.inputPlaceholder};
      opacity: 0.7;
    }

    &:focus {
      border-color: ${({ theme }) => theme.accentColor};
      box-shadow: 0 0 5px ${({ theme }) => theme.accentColor}66;
      outline: none;
    }
  }

  button {
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    color: ${({ theme }) => theme.inputText};
    transition: background-color 0.3s ease;

    &.add {
      background-color: ${({ theme }) => theme.accentColor};
    }
    &.edit {
      background-color: #ffc107;
    }
    &.delete {
      background-color: #dc3545;
    }

    &:hover {
      opacity: 0.85;
    }
  }

  h3 {
    margin-bottom: 15px;
    color: ${({ theme }) => theme.color};
  }

  img {
    border-radius: 5px;
    display: block;
    margin-top: 10px;
  }

  .array-fields {
    display: flex;
    gap: 5px;
    margin-bottom: 5px;
  }
`;

function DashboardProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({
    id: null,
    title: '',
    bodyText: '',
    image: null,
    links: [{ name: '', url: '' }],
    tags: ['']
  });

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/projects');
      const data = await res.json();
      const mappedProjects = data.projects.map(p => ({
        ...p,
        links: Array.isArray(p.links) ? p.links :
               JSON.parse(p.links || '[]').map(l => ({ name: l.text, url: l.href })),
        tags: Array.isArray(p.tags) ? p.tags : JSON.parse(p.tags || '[]')
      }));
      setProjects(mappedProjects);
      setLoading(false);
    } catch (err) { console.error(err); setLoading(false); }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') setForm({ ...form, image: files[0] });
    else setForm({ ...form, [name]: value });
  };

  const handleArrayChange = (index, value, type, subType = null) => {
    const updated = [...form[type]];
    if (subType) updated[index][subType] = value;
    else updated[index] = value;
    setForm({ ...form, [type]: updated });
  };

  const handleAddField = (type) => {
    if (type === 'links') setForm({ ...form, links: [...form.links, { name: '', url: '' }] });
    else setForm({ ...form, [type]: [...form[type], ''] });
  };

  const handleRemoveField = (index, type) => {
    const updated = form[type].filter((_, i) => i !== index);
    setForm({ ...form, [type]: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('bodyText', form.bodyText);
      formData.append('links', JSON.stringify(form.links.filter(l => l.name && l.url).map(l => ({ text: l.name, href: l.url }))));
      formData.append('tags', JSON.stringify(form.tags.filter(t => t.trim() !== '')));
      if (form.image instanceof File) formData.append('image', form.image);

      if (form.id) {
        await fetch(`http://localhost:3001/api/projects/${form.id}`, { method: 'PUT', body: formData });
        setMessage('Project updated successfully!');
      } else {
        await fetch('http://localhost:3001/api/projects', { method: 'POST', body: formData });
        setMessage('Project added successfully!');
      }

      setForm({ id: null, title: '', bodyText: '', image: null, links: [{ name: '', url: '' }], tags: [''] });
      fetchProjects();
    } catch (err) { console.error(err); setMessage('Failed to save project.'); }
  };

  const handleEdit = (project) => {
    setForm({
      id: project.id,
      title: project.title,
      bodyText: project.bodyText,
      image: project.image,
      links: project.links.length ? project.links : [{ name: '', url: '' }],
      tags: project.tags.length ? project.tags : ['']
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try { await fetch(`http://localhost:3001/api/projects/${id}`, { method: 'DELETE' }); setMessage('Project deleted successfully!'); fetchProjects(); }
    catch (err) { console.error(err); setMessage('Failed to delete project.'); }
  };

  if (loading) return <p>Loading projects...</p>;

  return (
    <>
      <Header title="Manage Projects" />
      <HeaderDash />
      <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
        <Section>
          <h3>{form.id ? 'Edit Project' : 'Add New Project'}</h3>
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <label>Title:</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} required placeholder="Enter title" />

            {/* Body Text */}
            <label>Body Text:</label>
            <textarea name="bodyText" value={form.bodyText} onChange={handleChange} rows={4} required placeholder="Enter description" />

            {/* Links */}
            <label>Links:</label>
            {form.links.map((link, i) => (
              <div key={i} className="array-fields">
                <input type="text" value={link.name} placeholder="Link Name" onChange={e => handleArrayChange(i, e.target.value, 'links', 'name')} />
                <input type="text" value={link.url} placeholder="Link URL" onChange={e => handleArrayChange(i, e.target.value, 'links', 'url')} />
                <button type="button" className="delete" onClick={() => handleRemoveField(i, 'links')}>Remove</button>
              </div>
            ))}
            <button type="button" className="add" onClick={() => handleAddField('links')}>Add Link</button>

            {/* Tags */}
            <label>Tags:</label>
            {form.tags.map((tag, i) => (
              <div key={i} className="array-fields">
                <input type="text" value={tag} placeholder="Tag" onChange={e => handleArrayChange(i, e.target.value, 'tags')} />
                <button type="button" className="delete" onClick={() => handleRemoveField(i, 'tags')}>Remove</button>
              </div>
            ))}
            <button type="button" className="add" onClick={() => handleAddField('tags')}>Add Tag</button>

            {/* Image */}
            <label>Image:</label>
            <input type="file" name="image" onChange={handleChange} />
            {form.image && typeof form.image === 'string' && <img src={`http://localhost:3001/${form.image}`} alt="Preview" width="150" />}

            <button type="submit" className="add" style={{ marginTop: '10px' }}>{form.id ? 'Update Project' : 'Add Project'}</button>
          </form>
        </Section>

        {message && <p style={{ fontWeight: 'bold', marginBottom: '20px' }}>{message}</p>}

        <Section>
          <h3>Existing Projects</h3>
          {projects.length === 0 && <p>No projects found.</p>}
          {projects.map(p => (
            <div key={p.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
              <h4>{p.title}</h4>
              <p>{p.bodyText}</p>
              {p.image && <img src={`http://localhost:3001/${p.image}`} alt={p.title} width="150" />}
              {p.links?.length > 0 && <p><strong>Links:</strong> {p.links.map(l => `${l.name}: ${l.url}`).join(', ')}</p>}
              {p.tags?.length > 0 && <p><strong>Tags:</strong> {p.tags.join(', ')}</p>}
              <button className="edit" onClick={() => handleEdit(p)}>Edit</button>
              <button className="delete" onClick={() => handleDelete(p.id)}>Delete</button>
            </div>
          ))}
        </Section>
      </div>
    </>
  );
}

export default DashboardProjects;
