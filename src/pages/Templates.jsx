import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cards from '../components/Cards';
import AddTemplate from '../components/AddTemplate';
import { fetchTemplates } from '../Api/templateApi';
import Sidebar from '../components/Sidebar';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';

function Templates() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);
  const [isLoading,setIsLoading]=useState(true);
  const [isAddTemplateModalOpen, setIsAddTemplateModalOpen] = useState(false);
  useEffect(() => {
    const getTemplates = async () => {
      setIsLoading(true);
      try {
        const data = await fetchTemplates(currentPage, limit);
        setTemplates(data.templates);
        setTotalPages(data.totalPages);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
      // finally {
      //   setIsLoading(false); // Set loading to false after fetching data
      // }
    };

    getTemplates();
  }, [currentPage, limit]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleAddTemplate = (newTemplate) => {
    setTemplates([...templates, newTemplate]);
  };
  const handleView = (template) => {
    setSelectedTemplate(template);
  };

  const handleCloseModal = () => {
    setSelectedTemplate(null);
  };

 
  const handleSelect = () => {
    if (selectedTemplate) {
      navigate('/emails', { state: { content: selectedTemplate.content, id: selectedTemplate._id } });
    }
  };
 // Get current templates
//  const indexOfLastTemplate = currentPage * templatesPerPage;
//  const indexOfFirstTemplate = indexOfLastTemplate - templatesPerPage;
//  const currentTemplates = templates.slice(indexOfFirstTemplate, indexOfLastTemplate);

 // Change page
//  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    
      <div className=" flex min-h-screen pt-5 bg-slate-100 ">
          <Sidebar/>
          <div className="flex-1 p-6">
        <div className='flex justify-between '>
    <h1 className="text-2xl font-bold mb-6">Templates</h1>
    <button
      onClick={() => setIsAddTemplateModalOpen(true)}
    className="bg-black text-white px-3 py-2 rounded-sm hover:bg-black mb-4"
    >
      Add Template
    </button>
    </div>
    {isLoading?(
      <Loader/>
    )
  :(
    <>
    <Cards templates={templates} onView={handleView}  />
  <Pagination
          templatesPerPage={limit}
          totalTemplates={totalPages * limit}
          paginate={handlePageChange}
          currentPage={currentPage}
        />
    </>

  )
  }
  


    {selectedTemplate && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 xl:w-2/3 max-h-full overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4">{selectedTemplate.name}</h3>
          <h4 className="text-lg text-gray-600 mb-4">{selectedTemplate.subject}</h4>
          <div className="mb-4 w-full h-80 p-2 border border-gray-300 rounded-lg overflow-y-auto" dangerouslySetInnerHTML={{ __html: selectedTemplate.content }} />
          <div className="flex justify-between">
            <button
              onClick={handleCloseModal}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Close
            </button>
            <button
              onClick={handleSelect}
              className="bg-black text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Select
            </button>
          </div>
        </div>
      </div>
    )}

    {isAddTemplateModalOpen && (
      <AddTemplate
        onClose={() => setIsAddTemplateModalOpen(false)}
        onTemplateAdded={handleAddTemplate}
      />
    )}
  </div>
  </div>
  );
}

export default Templates;