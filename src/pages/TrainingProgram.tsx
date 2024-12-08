// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import TrainingProgramModel from "@/components/TrainingProgram/TrainingProgramModel";
// import Button from "@/components/share/Button";
// import Title from "@/components/share/Title";
// import { Edit, Plus, Trash2 } from "lucide-react";
// import { useState } from "react";
// import { useGetProgramQuery, useDeleteProgramMutation } from "@/redux/apiSlices/programApi";
// import { imageUrl } from "@/redux/api/apiSlice";
// import Swal from "sweetalert2";


// const TrainingProgram = () => {
//   const { data: programs, refetch } = useGetProgramQuery(undefined)
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState(null);
//   const [deleteProgram] = useDeleteProgramMutation()

//   const showModal = (values:any) => {
//     setOpen(true);
//     if(values?.id){
//       setValue(values)
//     }
//   };

//   const handleDeleteProgram = async(id:string)=>{
//     try {
//       await deleteProgram(id).unwrap().then((response)=>{
//         console.log(response);
//         if(response?.statusCode === 200){
//           Swal.fire({
//             title: "Updated!",
//             text: response?.message,
//             icon: "success",
//             showConfirmButton: false,
//             timer: 1500,
//           }).then(()=>{
//             refetch()
//           })
//         }
//       })
//     } catch (error:any) {
//       Swal.fire({
//         title: "Deleted!",
//         text: error.data.message,
//         icon: "error",
//         showConfirmButton: false,
//         timer: 1500,
//       })
//     }
//   }
//   return (
//     <div className="px-4">
//       <div className="flex justify-between items-center mb-10 mt-4">
//         <Title className="text-white">All Training Program</Title>
//         <Button onClick={()=>showModal(true)} icon={<Plus size={20} />}>
//           Add Program
//         </Button>
//       </div>
//       <div className="grid grid-cols-6 gap-5">
//         {programs?.data?.map((program:any, index:number) => (
//           <div className="relative" key={index}>
//             <figure className="bg-primary rounded-t-xl rounded-br-xl">
//               <img
//                 style={{width : "100%", height: 150, objectFit: "cover"}}
//                 src={`${imageUrl}${program?.image}`}
//                 className="w-full  rounded-t-xl rounded-br-xl"
//                 alt=""
//               />
//               <figcaption className="text-gray-400 text-xl p-1">
//                 {program?.title}
//               </figcaption>
//             </figure>
//             <div className="text-white flex flex-col-reverse items-center gap-2 absolute top-2 right-2">
//               <Trash2 className="cursor-pointer" color="red" onClick={()=>handleDeleteProgram(program?._id)} />
//             <button
//               onClick={()=>showModal(program)}
              
//             >
//               <Edit />
//             </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <TrainingProgramModel refetch={refetch} value={value} setValue={setValue} open={open} setOpen={setOpen} />
//     </div>
//   );
// };

// export default TrainingProgram;







import { useState, useEffect } from "react";
import { useGetProgramQuery, useDeleteProgramMutation } from "@/redux/apiSlices/programApi";
import { imageUrl } from "@/redux/api/apiSlice";
import { Trash2, Edit, Plus } from "lucide-react";
import Button from "@/components/share/Button";
import Title from "@/components/share/Title";
import Swal from "sweetalert2";
import TrainingProgramModel from "@/components/TrainingProgram/TrainingProgramModel";
import "./dragDropStyle.css";
const TrainingProgram = () => {
  const { data: programs, refetch } = useGetProgramQuery(undefined);
  const [programList, setProgramList] = useState<any[]>([]);
  const [deleteProgram] = useDeleteProgramMutation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);


  // Set local state for program list when data is fetched
  useEffect(() => {
    if (programs?.data) {
      setProgramList(programs.data); // Populate state with programs
    }
  }, [programs?.data]);

  // Modal for editing a program
  const showModal = (values: any) => {
    setOpen(true);
    if (values?.id) {
      setValue(values); // Set value for editing
    }
  };

  // Delete program logic
  const handleDeleteProgram = async (id: string) => {
    try {
      await deleteProgram(id).unwrap().then((response) => {
        if (response?.statusCode === 200) {
          Swal.fire({
            title: "Deleted!",
            text: response?.message,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            refetch();
            setProgramList(programList.filter((program) => program._id !== id)); // Update UI after deletion
          });
        }
      });
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: error.data.message,
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  // Handle the start of the drag event
  const handleDragStart = (e: React.DragEvent, index: number) => {
    // Set dataTransfer with the index of the dragged program
    e.dataTransfer.setData("draggedIndex", index.toString());
  };

  // Allow dropping by preventing the default action
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Allow the drop
  };

  // Handle the drop event and reorder the programs
  // const handleDrop = (e: React.DragEvent, targetIndex: number) => {
  //   const draggedIndex = e.dataTransfer.getData("draggedIndex");
  //   const updatedList = [...programList];

  //   // Remove the dragged program and insert it at the new position
  //   const [draggedItem] = updatedList.splice(Number(draggedIndex), 1);
  //   updatedList.splice(targetIndex, 0, draggedItem);

  //   // Update the state with the new order
  //   setProgramList(updatedList);
  // };
  // Inside the handleDrop function, after reordering
const handleDrop = async (e: React.DragEvent, targetIndex: number) => {
  const draggedIndex = e.dataTransfer.getData("draggedIndex");
  const updatedList = [...programList];

  // Remove the dragged program and insert it at the new position
  const [draggedItem] = updatedList.splice(Number(draggedIndex), 1);
  updatedList.splice(targetIndex, 0, draggedItem);

  // Update the state with the new order
  setProgramList(updatedList);

  // Send the updated order to the backend
  const updatedSerials = updatedList.map((program: any, index: number) => ({
    ...program,
    serial: index + 1, // Set the new serial based on the index
  }));

  try {
    // Assuming you have an API endpoint like /update-program-order to handle this request
   const res = await fetch('http://143.198.3.51:8000/update-program-order', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedSerials),
    });
   if(res.status === 200
   ){
    // Swal.fire({
    //   title: 'Success!',
    //   text: 'Program order updated successfully!',
    //   icon: 'success',
    //   showConfirmButton: false,
    //   timer: 1500,
    // });
    console.log("Program order updated successfully")
   }
   else{
    Swal.fire({
      title: 'Error!',
      text: 'Failed to update program order.',
      icon: 'error',
      showConfirmButton: false,
      timer: 1500,
    });
   }
  } catch (error) {
    Swal.fire({
      title: 'Error!',
      text: 'Failed to update program order.',
      icon: 'error',
      showConfirmButton: false,
      timer: 1500,
    });
  }
};


  // Render the component with drag-and-drop functionality
  return (
    <div className="px-4">
      <div className="flex justify-between items-center mb-10 mt-4">
        <Title className="text-white">All Training Programs</Title>
        <Button onClick={() => showModal(true)} icon={<Plus size={20} />}>
          Add Program
        </Button>
      </div>

      {/* Training Programs List with Drag-and-Drop */}
      <div className="grid grid-cols-6 gap-5">
        {programList.map((program: any, index: number) => (
          <div
            key={program._id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)} // When drag starts, store index
            onDragOver={handleDragOver} // Allow dropping on the item
            onDrop={(e) => handleDrop(e, index)} // When dropped, reorder items
            className="program-card relative"
            style={{
              marginBottom: "10px",
            }}
          >
            <figure>
              <img
                style={{ width: "100%", height: 150, objectFit: "cover" }}
                src={`${imageUrl}${program?.image}`}
                alt={program?.title}
                className="w-full rounded-t-xl rounded-br-xl program-image"
              />
              <figcaption className="text-gray-400 text-xl p-1">{program?.title}</figcaption>
            </figure>
            <div className="text-white flex flex-col-reverse items-center gap-2 absolute top-2 right-2">
              <Trash2
                className="cursor-pointer program-delete"
                color="red"
                onClick={() => handleDeleteProgram(program?._id)}
              />
              <button onClick={() => showModal(program)}>
                <Edit />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Editing a Program */}
      <TrainingProgramModel
        open={open}
        setOpen={setOpen}
        value={value}
        setValue={setValue}
        refetch={refetch}
        // handleUpdateProgram={(updatedProgram: any) => {
        //   // Handle the program update here
        //   // Assuming you have an update function or mutation
        // }}
      />
    </div>
  );
};

export default TrainingProgram;
