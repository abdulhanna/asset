import React from 'react'
import { useState,useEffect } from 'react'
import { PaginationLeft,PaginationRight } from '@/components/atoms/icons'
import { Text1 } from '@/components/atoms/field'
import { MasterTableLogs } from '@/components/organism/tablecomp'
import Modifytable from 'proj-components/Dashboard/masterTable/modifytable'
import { arrayMove } from 'helpers/formdataConverter'

const Test2 = () => {
    const [checkedNewData, setCheckedNewData] = useState([])
    const [allClick, setAllClick] = useState(false)
    const [masterData,setMasterData] = useState([
      {_id:'12143',code:'01',description:"building",Rate1:'10%', parentcode:'',Rate2:'11%'},
      {_id:'12141',code:'01A',description:"building ", parentcode:'01',Rate1:'4%',Rate2:'3.9%'},
      {_id:'12140',code:'01B',description:"building material", parentcode:'01',Rate1:'8%',Rate2:'9%'}
    ])
    const headerDataNew = [
        // { name: 'date',
        //   label: 'Date' },
        {
          name: 'sampleId',
          label: 'Sample ID',
        },
        {
          name: 'qrCode',
          label: 'QR Code',
        },
        {
          name: 'sourceData',
          label: 'Source Type',
        },
        {
          name: 'locationData',
          label: 'Location',
        },
        {
          name: 'subSourceData',
          label: 'Sub Location',
        },
        // {
        //   lable:'Action',
        //   name:'action',
        // },
        {
          name: 'action',
          label: 'Action',
        }
      ];

      const newFilteredSample = [
        {   _id:345657685675645,
            sampleId:'1234567890',
            qrCode:"https://www.google.com",
            sourceData : "Google",  
            locationData :"Bangalore, India" ,
            subSourceData  :"Karnataka, Bangalore",
            type:"Covid-19",
            status:false
            },{
                _id :35674532364,
                sampleId:'0987654321',
                qrCode:"https://www.google.com",    
                sourceData : "Google",
                locationData :"patna, India" ,
                subSourceData  :"patna, Bihar",
                type:"Covid-19",
                status:true
              }
        
      ]


      const clickAll = (e)=>{
        setAllClick(!allClick)
      }

      const onNewCheck=(data)=>{
        // console.log(data,'data')
        const exist = checkedNewData.find(
            (element) => element._id === data._id
        );
        console.log(exist,'exit')
        if (exist) {
          setCheckedNewData(
              checkedNewData.filter((single) => single._id !== data._id)
          );
        } else {
          setCheckedNewData([...checkedNewData, data]);
        }
      }
    //     if(samplePermission.actions === true){
      
    
    //   }

 
    
     
   const headerMaster = [
    {label:"Code NO" ,name:"code"},
    {label:"Parentcode" ,name:"parentcode"},
    {label:"BLock Description", name :"description"},
    {label: "Rate(SLM)",name:'Rate1'},
    {label:"Rate(WDB)", name:"Rate2"},
    
   ] 
const master = [
  {_id:'12143',code:'01',description:"building",Rate1:'10%', parentcode:'',Rate2:'11%'},
  {_id:'12141',code:'01A',description:"building ", parentcode:'01',Rate1:'4%',Rate2:'3.9%'},
  {_id:'12140',code:'01B',description:"building material", parentcode:'01',Rate1:'8%',Rate2:'9%'}
]
    useEffect(()=>{
        // console.log(checkedNewData,'cehc')
    },[checkedNewData])

    useEffect(()=>{
        if(allClick === true){
          setCheckedNewData(newFilteredSample)
        }else {
          setCheckedNewData([])
        }
       },[allClick])

      const onDragDrop = (oldIndex,newIndex)=>{
        // setMasterData(arrayMove(masterData,oldIndex,newIndex))
        // console.log(oldIndex,newIndex,'data')
      }
      console.log(masterData,'masterdata')
  return (
    <div className='p-8'>
      <h2>Master table</h2>
      {/* <MasterTableNew
                  response={newFilteredSample}
                  headerData={[{ name: 'check', label:'' },...headerDataNew]}
                  checkedData={checkedNewData}
                  responseData={(e) => onNewCheck(e)}
                //   rejectSample={(e) => rejectSample(e)}
                //   approveSample={(e) => approveSample(e)}
                //   samplePermission={samplePermission}
                  clickAll={clickAll}
                  onClick={(e)=> console.log(e,'onclick') }
                  checkAllStatus={allClick}
                  currentPage ={currentPage}
                  pageSize ={pageSize}
                  onPageChange ={onPageChange}
                  chemicalPaginationData ={chemicalPaginationData}
                  microPaginationData ={microPaginationData}
                  type ={type}

              />  */}
              {/* <TableComp2
                 headers={headerMaster}
             responseData={(e) => console.log(e, "e")}
            body={master.map((item) => {
            return {
              ...item,
              href: `id=${item.id}`,
            };
          })}
          href={`/testing/?`}
              /> */}
              {/* <MasterTableLogs 
                   response={newFilteredSample}
                  // headerData={[{ name: 'check', label:'' },...headerDataNew]}
                  headerData={headerDataNew}
                  checkedData={checkedNewData}
                  responseData={(e) => onNewCheck(e)}
                  clickAll={clickAll}
                  onClick={(e)=> console.log(e,'onclick') }
                  checkAllStatus={allClick}
                  onEdit={(e)=> console.log(e)}
                  onDelete ={(e)=> console.log(e)}
              /> */}

              {/* <div className='my-20'>
                   <Button>PUBLISH</Button>
                   <Text1 color='text-green-400'>PUBLISHED</Text1>
              </div> */}

              <Modifytable
                header={[...headerMaster,{label:'Action',name:'action'}]}
                headerdata={masterData}
                onDragDrop={onDragDrop}
              />
         
    </div>
  )
}

export default Test2
