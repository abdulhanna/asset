// import { TextInput } from '@/utils/helper'
// import React, { useState } from 'react'
// import { TextField, CustomSelect, Dropdown } from '@/components/atoms/field'
//
// function DynamicImages() {
//   const Data = {
//     "success": true,
//     "fieldGroups": [
//       {
//         "_id": "64fafd31d4a7cfc158d71213",
//         "groupName": "Asset Identification",
//         "subgroups": [
//           {
//             "subgroupName": "Asset Description",
//             "_id": "64fb15ded4a7cfc158d7121b",
//             "fields": [
//               {
//                 "organizationId": null,
//                 "name": "Name of the Asset",
//                 "dataType": "String",
//                 "fieldLength": 30,
//                 "listOptions": [],
//                 "errorMessage": "Name of the Asset is required.",
//                 "fieldType": "Input text",
//                 "dependentFieldId": [],
//                 "isMandatory": true,
//                 "isDeleted": false,
//                 "_id": "64fb16a0d4a7cfc158d71227",
//                 "fieldRelation": "Independent"
//               },
//               {
//                 "organizationId": null,
//                 "name": "Asset Serial No.",
//                 "dataType": "String",
//                 "fieldLength": 30,
//                 "listOptions": [],
//                 "errorMessage": "Asset Serial no. is required.",
//                 "fieldType": "Input text",
//                 "fieldRelation": "Independent",
//                 "dependentFieldId": [],
//                 "isMandatory": true,
//                 "isDeleted": false,
//                 "_id": "64fb1741d4a7cfc158d71230"
//               },
//               {
//                 "organizationId": null,
//                 "name": "Asset Id",
//                 "dataType": "String",
//                 "fieldLength": 30,
//                 "listOptions": [],
//                 "errorMessage": "Please add Asset Id",
//                 "fieldType": "Input Text",
//                 "fieldRelation": "Independent",
//                 "dependentFieldId": [],
//                 "isMandatory": false,
//                 "isDeleted": false,
//                 "_id": "6502a76e6ab2aa5920288a4d"
//               },
//               {
//                 "organizationId": null,
//                 "name": "Asset Description",
//                 "dataType": "String",
//                 "fieldLength": 100,
//                 "listOptions": [],
//                 "errorMessage": "",
//                 "fieldType": "Textarea",
//                 "fieldRelation": "Independent",
//                 "dependentFieldId": [],
//                 "isMandatory": false,
//                 "isDeleted": false,
//                 "_id": "6502adf16ab2aa5920288aaa"
//               },
//               {
//                 "organizationId": null,
//                 "name": "Asset Id will be generated",
//                 "dataType": "List",
//                 "fieldLength": 10,
//                 "listOptions": [
//                   "Automatic",
//                   "Manual"
//                 ],
//                 "errorMessage": "Please select at least one option.",
//                 "fieldType": "Radio Button",
//                 "fieldRelation": "Dependent",
//                 "dependentFieldId": [
//                   "6502a76e6ab2aa5920288a4d"
//                 ],
//                 "dependentOn": "Manual",
//                 "isMandatory": true,
//                 "isDeleted": false,
//                 "_id": "6502dd386ab2aa5920288bd4"
//               }
//             ]
//           },
//           {
//             "subgroupName": "Asset measurements & quantity",
//             "_id": "64fb15ded4a7cfc158d7121c",
//             "fields": [
//               {
//                 "organizationId": null,
//                 "name": "Unit of Measurements",
//                 "dataType": "List",
//                 "fieldLength": 10,
//                 "listOptions": [
//                   "Quantity/Count",
//                   "Kilograms (kg)/Grams (g)",
//                   "Liters (L)/Milliliters (mL)",
//                   "Square Meters (m²)/Square Feet (ft²)",
//                   "Meters (m)/Feet (ft)",
//                   "Bundles",
//                   "Packages",
//                   "Pieces"
//                 ],
//                 "errorMessage": "Please add an unit of measurement",
//                 "fieldType": "Dropdown",
//                 "fieldRelation": "Independent",
//                 "dependentFieldId": [],
//                 "isMandatory": true,
//                 "isDeleted": false,
//                 "_id": "6502af586ab2aa5920288ac1"
//               },
//               {
//                 "organizationId": null,
//                 "name": "Number of Items",
//                 "dataType": "Number",
//                 "fieldLength": 10,
//                 "listOptions": [],
//                 "errorMessage": "Please add number of Items",
//                 "fieldType": "Input Number",
//                 "fieldRelation": "Independent",
//                 "dependentFieldId": [],
//                 "isMandatory": true,
//                 "isDeleted": false,
//                 "_id": "6502b0de6ab2aa5920288ada"
//               },
//               {
//                 "organizationId": null,
//                 "name": "Sr. No",
//                 "dataType": "Number",
//                 "fieldLength": 5,
//                 "listOptions": [],
//                 "errorMessage": "Please add Sr. No.",
//                 "fieldType": "Input Number",
//                 "fieldRelation": "Independent",
//                 "dependentFieldId": [],
//                 "isMandatory": true,
//                 "isDeleted": false,
//                 "_id": "6502d6d86ab2aa5920288b7c"
//               },
//               {
//                 "organizationId": null,
//                 "name": "Unique Item Id",
//                 "dataType": "String",
//                 "fieldLength": 10,
//                 "listOptions": [],
//                 "errorMessage": "Please enter unique item id",
//                 "fieldType": "Input Text",
//                 "fieldRelation": "Independent",
//                 "dependentFieldId": [],
//                 "isMandatory": true,
//                 "isDeleted": false,
//                 "_id": "6502d71d6ab2aa5920288b8c"
//               },
//               {
//                 "organizationId": null,
//                 "name": "Rate Per Piece",
//                 "dataType": "Number",
//                 "fieldLength": 10,
//                 "listOptions": [],
//                 "errorMessage": "Please enter the Rate per piece",
//                 "fieldType": "Input Number",
//                 "fieldRelation": "Independent",
//                 "dependentFieldId": [],
//                 "isMandatory": true,
//                 "isDeleted": false,
//                 "_id": "6502d7656ab2aa5920288b9d"
//               },
//               {
//                 "organizationId": null,
//                 "name": "Do you want separate identification no. for each item?",
//                 "dataType": "List",
//                 "fieldLength": 10,
//                 "listOptions": [
//                   "Yes",
//                   "No"
//                 ],
//                 "errorMessage": "Please select at least one option.",
//                 "fieldType": "Radio Button",
//                 "fieldRelation": "Dependent",
//                 "dependentFieldId": [
//                   "6502d7656ab2aa5920288b9d",
//                   "6502d6d86ab2aa5920288b7c"
//                 ],
//                 "dependentOn": "Yes",
//                 "isMandatory": true,
//                 "isDeleted": false,
//                 "_id": "6502ddbf6ab2aa5920288bf9"
//               },
//               {
//                 "organizationId": null,
//                 "name": "Item ID will be generated:",
//                 "dataType": "List",
//                 "fieldLength": 10,
//                 "listOptions": [
//                   "Automatic",
//                   "Manual"
//                 ],
//                 "errorMessage": "Please select at least one option.",
//                 "fieldType": "Radio Button",
//                 "fieldRelation": "Dependent",
//                 "dependentFieldId": [
//                   "6502d71d6ab2aa5920288b8c"
//                 ],
//                 "dependentOn": "Manual",
//                 "isMandatory": true,
//                 "isDeleted": false,
//                 "_id": "6502de656ab2aa5920288c0c"
//               }
//             ]
//           },
//           {
//             "subgroupName": "Asset Components",
//             "_id": "64fb15ded4a7cfc158d7121d",
//             "fields": []
//           },
//           {
//             "subgroupName": "Asset assigned to",
//             "_id": "64fb15ded4a7cfc158d7121e",
//             "fields": []
//           },
//           {
//             "subgroupName": "Attachments",
//             "_id": "64fb15ded4a7cfc158d7121f",
//             "fields": [
//               {
//                 "organizationId": null,
//                 "name": "Upload Asset Image",
//                 "dataType": "",
//                 "fieldLength": 10,
//                 "listOptions": [],
//                 "errorMessage": "",
//                 "fieldType": "Uploads",
//                 "fieldRelation": "Independent",
//                 "dependentFieldId": [],
//                 "isMandatory": false,
//                 "isDeleted": false,
//                 "_id": "6502b91e6ab2aa5920288afd"
//               }
//             ]
//           }
//         ],
//         "fields": [],
//         "__v": 0
//       },
//       {
//         "_id": "64fafd31d4a7cfc158d71215",
//         "groupName": "Asset Acquisition",
//         "subgroups": [],
//         "fields": [],
//         "__v": 0
//       },
//       {
//         "_id": "64fafd31d4a7cfc158d71216",
//         "groupName": "Cost Details",
//         "subgroups": [],
//         "fields": [],
//         "__v": 0
//       },
//       {
//         "_id": "6502e0056ab2aa5920288c49",
//         "groupName": "Ownership Details",
//         "subgroups": [
//           {
//             "subgroupName": "Lease Details",
//             "_id": "6502e0476ab2aa5920288c4b",
//             "fields": [
//               {
//                 "organizationId": null,
//                 "name": "Lease type",
//                 "dataType": "List",
//                 "fieldLength": 10,
//                 "listOptions": [
//                   "Operating Lease",
//                   "Finance Lease (Capital Lease)",
//                   "Sale and Leaseback",
//                   "Sublease",
//                   "Short-Term Lease",
//                   "Long-Term Lease",
//                   "Ground Lease",
//                   "Full-Service Lease",
//                   "Triple Net Lease",
//                   "Percentage Lease"
//                 ],
//                 "errorMessage": "",
//                 "fieldType": "Dropdown",
//                 "fieldRelation": "Independent",
//                 "dependentFieldId": [],
//                 "isMandatory": false,
//                 "isDeleted": false,
//                 "_id": "6502e1706ab2aa5920288c7a"
//               },
//               {
//                 "organizationId": null,
//                 "name": "Lessor Name",
//                 "dataType": "String",
//                 "fieldLength": 10,
//                 "listOptions": [],
//                 "errorMessage": "",
//                 "fieldType": "Input Text",
//                 "fieldRelation": "Independent",
//                 "dependentFieldId": [],
//                 "isMandatory": false,
//                 "isDeleted": false,
//                 "_id": "6502e1a76ab2aa5920288c7f"
//               },
//               {
//                 "organizationId": null,
//                 "name": "Lease Period",
//                 "dataType": "List",
//                 "fieldLength": 10,
//                 "listOptions": [
//                   "Yearly",
//                   "Monthly"
//                 ],
//                 "errorMessage": "",
//                 "fieldType": "Dropdown",
//                 "fieldRelation": "Independent",
//                 "dependentFieldId": [],
//                 "isMandatory": false,
//                 "isDeleted": false,
//                 "_id": "6502e2886ab2aa5920288c85"
//               },
//               {
//                 "organizationId": null,
//                 "name": "Lease Start Date",
//                 "dataType": "Date",
//                 "fieldLength": 10,
//                 "listOptions": [],
//                 "errorMessage": "",
//                 "fieldType": "Date Field",
//                 "fieldRelation": "Independent",
//                 "dependentFieldId": [],
//                 "isMandatory": false,
//                 "isDeleted": false,
//                 "_id": "6502e2b36ab2aa5920288c8c"
//               },
//               {
//                 "organizationId": null,
//                 "name": "Lease End Date",
//                 "dataType": "Date",
//                 "fieldLength": 10,
//                 "listOptions": [],
//                 "errorMessage": "",
//                 "fieldType": "Date Field",
//                 "fieldRelation": "Independent",
//                 "dependentFieldId": [],
//                 "isMandatory": false,
//                 "isDeleted": false,
//                 "_id": "6502e2c06ab2aa5920288c94"
//               }
//             ]
//           },
//           {
//             "subgroupName": "Ownership Details",
//             "_id": "6502e0476ab2aa5920288c4c",
//             "fields": []
//           }
//         ],
//         "fields": [],
//         "__v": 0
//       }
//     ]
//   }
//
//
//   const [formData, setFormData] = useState({})
//
//
// //  const handleInputChange = (fieldId, value) =>{
// //   setFormData(prevData => ({
// //     ...prevData,
// //     [fieldId]: value
// //   }));
// //  }
//
// const handleInputChange = (fieldId, value) => {
//
//   setFormData(prevData => ({
//     ...prevData,
//     [fieldId]: value // Make sure value is a string, not an object
//   }));
//
// };
//
//   return (
//     <div>
//       THis is Dynamic Images
//       {
//         Data.fieldGroups.map((field) => {
//           return(
//             <>
//             <div>
//             {field.groupName}
//
//             {field.subgroups.map((sub) => {
//                  return(
//                   <>
//                     {sub.subgroupName}
//                     {sub.fields.map((newfield) =>{
//
//                           switch(newfield.fieldType){
//                                     case 'Input text':
//
//                                       return(
//
//                                         <TextField
//                                          key={newfield._id}
//                                          label={newfield.name}
//                                          value={formData[newfield._id] || ''}
//                                          onChange={(e) => handleInputChange(newfield._id, e.target.value)}
//                                         />
//                                       );
//
//                                     case 'Dropdown':
//
//                                       return(
//                                         <Dropdown
//                                           key={newfield._id}
//                                           label={newfield.name}
//                                           options={newfield.listOptions}
//                                           value={formData[newfield._id] || ''}
//                                          onChange={(e) => handleInputChange(newfield._id, e.target.value)}
//                                         />
//                                       )
//                                       default:
//                                          return null;
//                                       }
//                     })}
//                   </>
//                  )
//             })}
//             </div>
//
//             {/* {
//               field.fields.map((newfield) => {
//
//                 // switch(newfield.fieldType){
//                 //       case 'Input text':
//                 //         return(
//                 //           <TextField
//                 //            key={newfield._id}
//                 //            label={newfield.name}
//                 //            value={formData[field._id] || ''}
//                 //            onChange={(value) => handleInputChange(field._id, value)}
//                 //           />
//                 //         );
//
//                 //       case 'Dropdown':
//                 //         return(
//                 //           <Dropdown
//                 //             key={newfield._id}
//                 //             label={newfield.name}
//                 //             options={newfield.listOptions}
//                 //             value={formData[field._id] || ''}
//                 //            onChange={(value) => handleInputChange(field._id, value)}
//                 //           />
//                 //         )
//                 //         default:
//                 //           return null;
//                 // }
//               })
//             } */}
//
//             </>
//           )
//         })
//       }
//     </div>
//   )
// }
//
// export default DynamicImages
//
import React from 'react'

const DynamicImages = () => {
  return (
    <div>
       Dynamic Data
    </div>
  )
}

export default DynamicImages

