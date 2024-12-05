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



// // try 


import React, { useContext, useMemo } from 'react';
import { HolderOutlined } from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import Title from "@/components/share/Title";
import { Input, } from "antd";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import ArticleModal from "@/components/ArticleModal";
import { useDeleteArticleMutation, useGetArticleQuery } from "@/redux/apiSlices/articleApi";
import { imageUrl } from "@/redux/api/apiSlice";
import { GrClose } from "react-icons/gr";
import Swal from "sweetalert2";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Table } from 'antd';
import type { TableColumnsType } from 'antd';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

interface RowContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
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



const initialData: DataType[] = [
  { key: '1', name: 'John Brown', age: 32, address: 'Long text Long' },
  { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
  { key: '3', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park' },
];

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const Row: React.FC<RowProps> = (props) => {
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
    [setActivatorNodeRef, listeners],
  );

  return (
    <RowContext.Provider value={contextValue}>
      <tr {...props} ref={setNodeRef} style={style} {...attributes} />
    </RowContext.Provider>
  );
};

const App: React.FC = () => {
  const [keyword, setKeyword] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const { data: articles, refetch } = useGetArticleQuery({search:keyword, page: currentPage})
  const [dataSource, setDataSource] = React.useState<DataType[]>(articles);

  const [openModel, setOpenModel] = useState(false);
  const [value, setValue] = useState(null)

  const [deleteArticle] = useDeleteArticleMutation()

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((prevState) => {
        const activeIndex = prevState.findIndex((record) => record.key === active?.id);
        const overIndex = prevState.findIndex((record) => record.key === over?.id);
        return arrayMove(prevState, activeIndex, overIndex);
      });
    }
  };
  const columns: TableColumnsType<DataType> = [
    { key: 'sort', align: 'center', width: 80, render: () => <DragHandle /> },
      {
        title: "Image",
        dataIndex: "thumbnail",
        key: "thumbnail",
        render: (_:any, data:any)=>(
          <>
            <img style={{width: 50, height: 50, borderRadius: 8}} src={`${imageUrl}${data?.thumbnail}`} alt="" />
          </>
        )
      },
      {
        title: "Article Name",
        dataIndex: "article_title",
        key: "article_title",
      },
      {
        title: "Training Program",
        dataIndex: "training_program.title",
        key: "training_program.title",
        render: (_:any, data:any)=>(
          <p>{data?.training_program?.title}</p>
        )
      },
  
      {
        title: <div className="text-right">Action</div>,
        dataIndex: "action",
        key: "action",
        render: (_: any, data: any) => (
          <div className="flex items-center gap-2 justify-end">
            <button onClick={()=>showModal(data)} className="text-gray-400">
              <Edit />
            </button>
            <button onClick={()=>handleDelete(data?._id)} className="text-red-500">
              <Trash2 />
            </button>
          </div>
        ),
      },
  ];

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      <SortableContext items={dataSource.map((i) => i.key)} strategy={verticalListSortingStrategy}>
        <Table<DataType>
          rowKey="key"
          components={{ body: { row: Row } }}
          columns={columns}
          dataSource={dataSource}
        />
      </SortableContext>
    </DndContext>
  );
};

export default App;