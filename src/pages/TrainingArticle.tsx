

// // /* eslint-disable @typescript-eslint/no-explicit-any */
// import Button from "@/components/share/Button";
// import Title from "@/components/share/Title";
// import { Input, Table } from "antd";
// import { Edit, Plus, Search, Trash2 } from "lucide-react";
// import { useState } from "react";
// import ArticleModal from "@/components/ArticleModal";
// import { useDeleteArticleMutation, useGetArticleQuery } from "@/redux/apiSlices/articleApi";
// import { imageUrl } from "@/redux/api/apiSlice";
// import { GrClose } from "react-icons/gr";
// import Swal from "sweetalert2";

// const TrainingArticle = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [openModel, setOpenModel] = useState(false);
//   const [value, setValue] = useState(null)
//   const [keyword, setKeyword] = useState("")
//   const { data: articles, refetch } = useGetArticleQuery({search:keyword, page: currentPage})
//   const [deleteArticle] = useDeleteArticleMutation()
  

//   const handlePage = (page: any) => {
//     setCurrentPage(page);
//   };

//   const showModal = (value:any) => {
//     console.log("show modal", value);
//     setOpenModel(true);
//     setValue(value)
//   };

//   const handleDelete=async(id: string)=>{
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#333434",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes",
//       cancelButtonText : "No"
//     }).then(async(result) => {
//       if (result.isConfirmed) {
//         await deleteArticle(id).then((response)=>{
//           if(response?.data?.statusCode === 200){
//             Swal.fire({
//               title: "Deleted!",
//               text: "Article has been deleted.",
//               icon: "success",
//               showConfirmButton: false,
//               timer: 1500,
//             }).then(()=>{
//               refetch()
//             })
//           }
//         })
        
//       }
//     });
//   }

//   const columns = [
//     {
//       title: "S.ID",
//       dataIndex: "sId",
//       key: "sId",
//       render: (_:any, _data:any, index:number)=>(
//         <p>{index + 1}</p>
//       )
//     },
//     {
//       title: "Image",
//       dataIndex: "thumbnail",
//       key: "thumbnail",
//       render: (_:any, data:any)=>(
//         <>
//           <img style={{width: 50, height: 50, borderRadius: 8}} src={`${imageUrl}${data?.thumbnail}`} alt="" />
//         </>
//       )
//     },
//     {
//       title: "Article Name",
//       dataIndex: "article_title",
//       key: "article_title",
//     },
//     {
//       title: "Training Program",
//       dataIndex: "training_program.title",
//       key: "training_program.title",
//       render: (_:any, data:any)=>(
//         <p>{data?.training_program?.title}</p>
//       )
//     },

//     {
//       title: <div className="text-right">Action</div>,
//       dataIndex: "action",
//       key: "action",
//       render: (_: any, data: any) => (
//         <div className="flex items-center gap-2 justify-end">
//           <button onClick={()=>showModal(data)} className="text-gray-400">
//             <Edit />
//           </button>
//           <button onClick={()=>handleDelete(data?._id)} className="text-red-500">
//             <Trash2 />
//           </button>
//         </div>
//       ),
//     },
//   ];

  

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-5 px-4 pt-4">
//         <Title className="text-white">Article List</Title>
//         <div className="flex items-center gap-3">
//           <Input
//             prefix={<Search color="#fff" />}
//             style={{
//               width: 350,
//               background: "#6E6E6F",
//               boxShadow: "none",
//               color: "white"
//             }}
//             className=" h-12  border-0 text-primary placeholder:text-gray-200 hover:text-white"
//             placeholder="Search"
//             onChange={(e)=>setKeyword(e.target.value)}
//             value={keyword}
//             suffix={<GrClose style={{display: keyword ? "block" : "none"}} onClick={()=>setKeyword("")} className="cursor-pointer" color="#fff" />}
//           />

//           <Button
//             onClick={()=>showModal({})}
//             className="w-44"
//             icon={<Plus size={20} />}
//           >
//             Add article
//           </Button>
//         </div>
//       </div>
//       <Table
//         dataSource={articles?.data}
//         columns={columns}
//         pagination={{
//           total: articles?.meta?.total,
//           current: currentPage,
//           onChange: handlePage,
//         }}
//         rowHoverable={false}
//       />


//       <ArticleModal 
//         open={openModel}
//         setOpen={setOpenModel}
//         value={value}
//         refetch={refetch}
//         setValue={setValue}
//       />

      
//     </div>
//   );
// };

// export default TrainingArticle;






// other 

// import React, { useContext, useMemo, useState, useEffect } from 'react';
// import { HolderOutlined } from '@ant-design/icons';
// import type { DragEndEvent } from '@dnd-kit/core';
// import { DndContext } from '@dnd-kit/core';
// import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
// import { useSortable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';
// import { Button, Result, Table } from 'antd';
// import type { TableColumnsType } from 'antd';
// import { useGetArticleQuery, useUpdateSerialMutation } from '@/redux/apiSlices/articleApi'; // Import your RTK query hooks
// import { imageUrl } from '@/redux/api/apiSlice';
// import toast from 'react-hot-toast';

// interface DataType {
//   key: string;
//   article_title: string;
//   thumbnail: string;
//   training_program: {
//     title: string;
//   };
// }

// interface RowContextProps {
//   setActivatorNodeRef?: (element: HTMLElement | null) => void;
//   listeners?: Record<string, any>;
// }

// const RowContext = React.createContext<RowContextProps>({});

// const DragHandle: React.FC = () => {
//   const { setActivatorNodeRef, listeners } = useContext(RowContext);
//   return (
//     <Button
//       type="text"
//       size="small"
//       icon={<HolderOutlined />}
//       style={{ cursor: 'move' }}
//       ref={setActivatorNodeRef}
//       {...listeners}
//     />
//   );
// };

// const Row: React.FC<any> = (props) => {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     setActivatorNodeRef,
//     transform,
//     transition,
//     isDragging,
//   } = useSortable({ id: props['data-row-key'] });

//   const style: React.CSSProperties = {
//     ...props.style,
//     transform: CSS.Translate.toString(transform),
//     transition,
//     ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
//   };

//   const contextValue = useMemo<RowContextProps>(
//     () => ({ setActivatorNodeRef, listeners }),
//     [setActivatorNodeRef, listeners]
//   );

//   return (
//     <RowContext.Provider value={contextValue}>
//       <tr {...props} ref={setNodeRef} style={style} {...attributes} />
//     </RowContext.Provider>
//   );
// };

// const TrainingArticle = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [dataSource, setDataSource] = useState<DataType[]>([]);
//   // console.log("dataSource: " + JSON.stringify(dataSource, null, 2))
//   const { data: articles } = useGetArticleQuery({ search: '', page: currentPage });
//   const [updateSerial] = useUpdateSerialMutation(); // Mutation hook to update serial numbers

//   useEffect(() => {
//     if (articles?.data) {
//       setDataSource(
//         articles.data.map((article: any) => ({
//           key: article._id,
//           article_title: article.article_title,
//           thumbnail: article.thumbnail,
//           training_program: {
//             title: article.training_program?.title || '',
//           },
//         }))
//       );
//     }
//   }, [articles]);
// const [newUpdatedArray,setNewUpdatedArray] = useState<DataType[]>([]);



// const onDragEnd = async ({ active, over }: DragEndEvent) => {
//   if (active.id !== over?.id) {
//     setDataSource((prevState) => {
//       const activeIndex = prevState.findIndex((item) => item.key === active.id);
//       const overIndex = prevState.findIndex((item) => item.key === over?.id);
//       const newArray = [...prevState];
//       const [removed] = newArray.splice(activeIndex, 1);
//       newArray.splice(overIndex, 0, removed);

//       // Update newUpdatedArray
//       setNewUpdatedArray(newArray);

//       // Prepare data for backend immediately
//       const updatedData = newArray.map((item, index) => ({
//         ...item,
//         serial: index + 1,
//       }));

//       console.log("Updated Data:", JSON.stringify(updatedData, null, 2));

//       // Call the backend to update serial numbers
//       (async () => {
//         try {
//        const res =   await updateSerial(updatedData).unwrap();
//           if(res.success) {
//             toast.success('Serials updated successfully');
//           } else {
//             toast.error('Error updating serials');
//           }
//         } catch (error) {
//           console.error('Error updating serials:', error);
//         }
//       })();

//       return newArray;
//     });
//   }
// };




//   const columns: TableColumnsType<DataType> = [
//     { key: 'sort', align: 'center', width: 80, render: () => <DragHandle /> },
//     {
//       title: 'Image',
//       dataIndex: 'thumbnail',
//       key: 'thumbnail',
//       render: (thumbnail: string) => (
//         <img
//           style={{ width: 50, height: 50, borderRadius: 8 }}
//           src={`${imageUrl}${thumbnail}`}
//           alt="Thumbnail"
//         />
//       ),
//     },
//     {
//       title: 'Article Name',
//       dataIndex: 'article_title',
//       key: 'article_title',
//     },
//     {
//       title: 'Training Program',
//       dataIndex: ['training_program', 'title'],
//       key: 'training_program.title',
//       render: (title: string) => <p>{title}</p>,
//     },
    
//     // {
//     //   title: <div className="text-right">Action</div>,
//     //   dataIndex: "action",
//     //   key: "action",
//     //   render: (_: any, data: any) => (
//     //     <div className="flex items-center gap-2 justify-end">
//     //       <button onClick={()=>showModal(data)} className="text-gray-400">
//     //         <Edit />
//     //       </button>
//     //       <button onClick={()=>handleDelete(data?._id)} className="text-red-500">
//     //         <Trash2 />
//     //       </button>
//     //     </div>
//     //   ),
//     // },
//   ];

//   return (
//     <div>
//       {dataSource.length > 0 ? (
//         <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
//           <SortableContext items={dataSource.map((item) => item.key)} strategy={verticalListSortingStrategy}>
//             <Table<DataType>
//               rowKey="key"
//               components={{ body: { row: Row } }}
//               columns={columns}
//               dataSource={dataSource}
//               pagination={false}
//             />
//           </SortableContext>
//         </DndContext>
//       ) : (
//         <div>No data available</div>
//       )}
//     </div>
//   );
// };

// export default TrainingArticle;



// finel try 
import React, { useContext, useMemo, useState, useEffect } from 'react';
import { HolderOutlined } from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { useSortable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button,Result, Table } from 'antd';
// import Button   from "@/components/share/Button";
import type { TableColumnsType } from 'antd';
import { useDeleteArticleMutation, useGetArticleQuery, useUpdateSerialMutation } from '@/redux/apiSlices/articleApi'; // Import your RTK query hooks
import { imageUrl } from '@/redux/api/apiSlice';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import {  Trash2 } from "lucide-react";
import ArticleModal from '@/components/ArticleModal';
import { Input,  } from "antd";
import { Edit, Plus, Search,  } from "lucide-react";
import Title from "@/components/share/Title";
import { GrClose } from "react-icons/gr";
interface DataType {
  key: string;
  article_title: string;
  thumbnail: string;
  training_program: {
    title: string;
    _id: string;
  };
}

interface RowContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: Record<string, any>;
}

const RowContext = React.createContext<RowContextProps>({});

const DragHandle: React.FC = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext);
  return (
    <Button
      type="text"
      size="small"
      icon={<HolderOutlined />}
      style={{ cursor: 'move' }}
      ref={setActivatorNodeRef}
      {...listeners}
    />
  );
};

const Row: React.FC<any> = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props['data-row-key'] });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  const contextValue = useMemo<RowContextProps>(
    () => ({ setActivatorNodeRef, listeners }),
    [setActivatorNodeRef, listeners]
  );

  return (
    <RowContext.Provider value={contextValue}>
      <tr {...props} ref={setNodeRef} style={style} {...attributes} />
    </RowContext.Provider>
  );
};

const TrainingArticle = () => {
    const [openModel, setOpenModel] = useState(false);
    const [value, setValue] = useState(null)
    const [keyword, setKeyword] = useState("")
  const [currentPage, setCurrentPage] = useState(1);

  const [dataSource, setDataSource] = useState<DataType[]>([]);
  // console.log("dataSource: " + JSON.stringify(dataSource, null, 2))
  const { data: articles,refetch } = useGetArticleQuery({ search: '', page: currentPage });
  const [updateSerial] = useUpdateSerialMutation(); // Mutation hook to update serial numbers
  const [deleteArticle] = useDeleteArticleMutation()
  // useEffect(() => {
  //   if (articles?.data) {
  //     setDataSource(
  //       articles.data.map((article: any) => ({
  //         key: article._id,
  //         article_title: article.article_title,
  //         thumbnail: article.thumbnail,
  //         training_program: {
  //           title: article.training_program?.title || '',
  //           _id: article.training_program?._id || '',
  //         },
   
  //       }))
  //     );
  //   }
  // }, [articles]);
  useEffect(() => {
    if (articles?.data) {
      setDataSource(
        articles.data.map((article: any) => ({
          key: article._id,
          ...article, // Include all properties of the article
          training_program: {
            title: article.training_program?.title || '',
            _id: article.training_program?._id || '',
            image: article.training_program?.image || '',
            createdAt: article.training_program?.createdAt || '',
            updatedAt: article.training_program?.updatedAt || '',
          },
        }))
      );
    }
  }, [articles]);
const [newUpdatedArray,setNewUpdatedArray] = useState<DataType[]>([]);



const onDragEnd = async ({ active, over }: DragEndEvent) => {
  if (active.id !== over?.id) {
    setDataSource((prevState) => {
      const activeIndex = prevState.findIndex((item) => item.key === active.id);
      const overIndex = prevState.findIndex((item) => item.key === over?.id);
      const newArray = [...prevState];
      const [removed] = newArray.splice(activeIndex, 1);
      newArray.splice(overIndex, 0, removed);

      // Update newUpdatedArray
      setNewUpdatedArray(newArray);

      // Prepare data for backend immediately
      const updatedData = newArray.map((item, index) => ({
        ...item,
        serial: index + 1,
      }));

      console.log("Updated Data:", JSON.stringify(updatedData, null, 2));

      // Call the backend to update serial numbers
      (async () => {
        try {
       const res =   await updateSerial(updatedData).unwrap();
          if(res.success) {
            toast.success('Serials updated successfully');
          } else {
            toast.error('Error updating serials');
          }
        } catch (error) {
          console.error('Error updating serials:', error);
        }
      })();

      return newArray;
    });
  }
};

  const handlePage = (page: any) => {
    setCurrentPage(page);
  };

  const showModal = (value:any) => {
    console.log("value in model",value);
    setOpenModel(true);
    setValue(value)
  };

  const handleDelete=async(id: string)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#333434",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText : "No"
    }).then(async(result) => {
      if (result.isConfirmed) {
        await deleteArticle(id).then((response)=>{
          if(response?.data?.statusCode === 200){
            Swal.fire({
              title: "Deleted!",
              text: "Article has been deleted.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            }).then(()=>{
              refetch()
            })
          }
        })
        
      }
    });
  }


  const columns: TableColumnsType<DataType> = [
    { key: 'sort', align: 'center', width: 80, render: () => <DragHandle /> },
    {
      title: 'Image',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (thumbnail: string) => (
        <img
          style={{ width: 50, height: 50, borderRadius: 8 }}
          src={`${imageUrl}${thumbnail}`}
          alt="Thumbnail"
        />
      ),
    },
    {
      title: 'Article Name',
      dataIndex: 'article_title',
      key: 'article_title',
    },
    {
      title: 'Training Program',
      dataIndex: ['training_program', 'title'],
      key: 'training_program.title',
      render: (title: string) => <p>{title}</p>,
    },
    
    {
      title: <div className="text-right">Action</div>,
      dataIndex: "action",
      key: "action",
      render: (_: any, data: any) => (
        console.log("render data",data),
        <div className="flex items-center gap-2 justify-end">
          <button onClick={()=>showModal(data)} className="text-gray-400">
            <Edit />
          </button>
          <button onClick={()=>handleDelete(data?.key)} className="text-red-500">
            <Trash2 />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
            <div className="flex justify-between items-center mb-5 px-4 pt-4">
       <Title className="text-white">Article List</Title>
       <div className="flex items-center gap-3">
        <Input
            prefix={<Search color="#fff" />}
            style={{
              width: 350,
              background: "#6E6E6F",
              boxShadow: "none",
              color: "white"
            }}
            className=" h-12  border-0 text-primary placeholder:text-gray-200 hover:text-white"
            placeholder="Search"
            onChange={(e)=>setKeyword(e.target.value)}
            value={keyword}
            suffix={<GrClose style={{display: keyword ? "block" : "none"}} onClick={()=>setKeyword("")} className="cursor-pointer" color="#fff" />}
          />

          {/* <Button
            onClick={()=>showModal({})}
            className="w-44"
            icon={<Plus size={20} />}
          >
            Add article
          </Button> */}
         <div className='flex gap-2 h-11 flex items-center justify-center gap-1 bg-secondary text-white p-2 rounded'>
         <div>
            <Plus/>
          </div>
          <button
            onClick={()=>showModal({})}
            // className="w-44"
            // className='h-11 flex items-center justify-center gap-1 bg-secondary text-white p-2 rounded'
           
          >
            Add article
          </button>
         </div>
        </div>
      </div>
      {dataSource.length > 0 ? (
        <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
          <SortableContext items={dataSource.map((item) => item.key)} strategy={verticalListSortingStrategy}>
            <Table<DataType>
              rowKey="key"
              components={{ body: { row: Row } }}
              columns={columns}
              dataSource={dataSource}
              pagination={false}
            />
          </SortableContext>
        </DndContext>
      ) : (
        <div>No data available</div>
      )}
      
      <div>
           <ArticleModal
        open={openModel}
        setOpen={setOpenModel}
        value={value}
        refetch={refetch}
        setValue={setValue}
      />
      </div>

    </div>
  );
};

export default TrainingArticle;