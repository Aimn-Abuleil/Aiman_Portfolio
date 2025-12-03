import React, { useEffect, useState } from "react";
import Header from "./Header";
import HeaderDash from "./HeaderDash";
import apiUrl from "./config";
import styled from "styled-components";

// Styled wrapper
const Section = styled.div`
  margin-bottom: 30px;

  h4, h5 {
    color: ${({ theme }) => theme.color};
    margin-bottom: 15px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;

    input[type="text"],
    input[type="file"] {
      padding: 10px 12px;
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
      padding: 10px 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      color: white;
      background-color: ${({ theme }) => theme.accentColor};
      transition: opacity 0.3s ease;

      &:hover {
        opacity: 0.85;
      }
    }
  }

  .skills-category {
    margin-bottom: 20px;

    .skills-list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .skill-card {
      border: 1px solid ${({ theme }) => theme.cardBorderColor};
      background-color: ${({ theme }) => theme.cardBackground};
      color: ${({ theme }) => theme.color};
      padding: 10px;
      width: 200px;
      text-align: center;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;

      img {
        width: 50px;
        height: 50px;
        object-fit: contain;
      }

      button {
        padding: 4px 8px;
        border-radius: 5px;
        border: none;
        cursor: pointer;
        font-size: 0.8rem;
        color: white;
        transition: opacity 0.3s ease;

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
    }
  }
`;

function Skills() {
  const [skillsData, setSkillsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    category: "",
    title: "",
    icon: null,
  });
  const [editingId, setEditingId] = useState(null);

  const apiUrls = `https://aiman-portfolio-backend.onrender.com/api/skills`;

  const fetchSkills = async () => {
    try {
      const res = await fetch(apiUrls);
      const data = await res.json();
      setSkillsData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "icon") {
      setForm({ ...form, icon: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category", form.category);
    formData.append("title", form.title);
    if (form.icon) formData.append("icon", form.icon);

    try {
      let method = "POST";
      let url = apiUrls;
      if (editingId) {
        method = "PUT";
        url = `https://aiman-portfolio-backend.onrender.com/${editingId}`;
      }

      const res = await fetch(url, { method, body: formData });
      if (res.ok) {
        setForm({ category: "", title: "", icon: null });
        setEditingId(null);
        fetchSkills();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (category, skill) => {
    setEditingId(skill.id);
    setForm({ category, title: skill.title, icon: null });
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://aiman-portfolio-backend.onrender.com/${id}`, { method: "DELETE" });
      if (res.ok) fetchSkills();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Header title="Skills" />
      <HeaderDash />
      <div className="container">
        <Section>
          <h4>Add / Edit Skill</h4>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="title"
              placeholder="Skill Title"
              value={form.title}
              onChange={handleChange}
              required
            />
            <input type="file" name="icon" onChange={handleChange} />
            <button type="submit">{editingId ? "Update" : "Add"} Skill</button>
          </form>

          <hr />

          <h4>All Skills</h4>
          {Object.keys(skillsData).length === 0 ? (
            <p>No skills found.</p>
          ) : (
            Object.keys(skillsData).map((category) => (
              <div key={category} className="skills-category">
                <h5>{category}</h5>
                <div className="skills-list">
                  {skillsData[category]?.map((skill) => (
                    <div key={skill.id} className="skill-card">
                      <img
                        src={`https://aiman-portfolio-backend.onrender.com/${skill.icon}`}
                        alt={skill.title}
                      />
                      <p>{skill.title}</p>
                      <button className="edit" onClick={() => handleEdit(category, skill)}>
                        Edit
                      </button>
                      <button className="delete" onClick={() => handleDelete(skill.id)}>
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </Section>
      </div>
    </>
  );
}

export default Skills;
