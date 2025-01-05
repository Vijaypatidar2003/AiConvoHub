import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/userContext";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useContext(UserContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [project, setProject] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/projects/all")
      .then((res) => {
        console.log(res.data);
        setProject(res.data.projects);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [project]);

  function createProject(e) {
    e.preventDefault();
    axios
      .post("/projects/create", { name: projectName })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <main className="p-4">
      <div className="projects flex flex-col relative gap-3">
       <div>
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="project px-4 py-1 border border-slate-300 rounded-md"
          >
            New Project <i className="ri-link ml-2"></i>
          </button>

          <button onClick={()=>navigate(-1)}  className="border px-3 py-1 absolute right-0">back</button>
        </div>

       <div className="flex flex-col gap-1">
       {project.map((project) => (
          <div
            key={project._id}
            onClick={() =>
              navigate(`/project`, {
                state: { project },
              })
            }
            className="flex flex-col gap-2 cursor-pointer px-4 py-1 border border-slate-300 rounded-md min-w-52 hover:bg-slate-200"
          >
            <h2 className="font-semibold">{project.name}</h2>
            <div className="flex gap-2">
              <p>
                <i className="ri-user-line"></i> <small>Collaborators</small> :
                {project.users.length}
              </p>
            </div>
          </div>
        ))}

       </div>
       

        {/* <!-- Modal Background --> */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
            id="modal"
            aria-hidden="true"
          >
            {/* <!-- Modal Container --> */}
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-auto">
              {/* <!-- Modal Header --> */}
              <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold">New Project</h2>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setIsModalOpen(false)}
                >
                  ✖
                </button>
              </div>
              {/* <!-- Modal Body --> */}
              <form id="projectForm" className="p-4" onSubmit={createProject}>
                <div className="mb-4">
                  <label
                    htmlFor="projectName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Project Name
                  </label>
                  <input
                    type="text"
                    id="projectName"
                    name="projectName"
                    onChange={(e) => setProjectName(e.target.value)}
                    value={projectName}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter your project name"
                    required
                  />
                </div>
                {/* <!-- Modal Footer --> */}
                <div class="flex justify-end space-x-2">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
