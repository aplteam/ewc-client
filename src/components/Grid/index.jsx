// import { useAppData, useResizeObserver } from '../../hooks';
// import Cell from './Cell';
// import { useEffect, useState, useRef } from 'react';
// import { extractStringUntilSecondPeriod, setStyle, generateHeader } from '../../utils';

// const Grid = ({ data }) => {
//   const { findDesiredData, socket } = useAppData();
//   const [selectedGrid, setSelectedGrid] = useState(null);
//   const [tableProperty, setTableProperty] = useState({ row: false, column: false, body: false });
//   const dimensions = useResizeObserver(
//     document.getElementById(extractStringUntilSecondPeriod(data?.ID))
//   );

//   let size = 0;
//   const {
//     Size,
//     Values,
//     Input,
//     ColTitles,
//     RowTitles,
//     CellWidths,
//     Visible,
//     CurCell,
//     CellTypes,
//     ShowInput,
//     FormattedValues,
//     BCol,
//     CellFonts,
//     RowTitleBCol,
//     RowTitleFCol,
//     ColTitleBCol,
//     ColTitleFCol,
//     TitleHeight,
//     TitleWidth,
//     FormatString,
//     VScroll = 0,
//     HScroll = 0,
//     Attach,
//     Event,
//   } = data?.Properties;

//   const handleGridClick = (row, column, property) => {
//     if (property == 'column') {
//       setTableProperty({
//         row: false,
//         column: true,
//         body: false,
//       });
//     } else if (property == 'row') {
//       setTableProperty({
//         row: true,
//         column: false,
//         body: false,
//       });
//     } else if (property == 'body') {
//       setTableProperty({
//         row: false,
//         column: false,
//         body: true,
//       });
//     }
//     localStorage.setItem(
//       data?.ID,
//       JSON.stringify({
//         Event: {
//           CurCell: [row, column],
//           Values,
//         },+
//   useEffect(() => {
//     if (cells.current.length > 0) {
//       cells.current[0].focus(); // Set initial focus on the first cell
//     }
//   }, []);

//   if (!ColTitles) {
//     size = Values[0]?.length + 1;
//   }

//   useEffect(() => {
//     localStorage.setItem(
//       data?.ID,
//       JSON.stringify({
//         Event: {
//           CurCell: !CurCell ? [0, 0] : CurCell,
//           Values,
//         },
//       })
//     );

//     if (CurCell) {
//       setSelectedGrid({ row: CurCell[0], column: CurCell[1] });
//       setTableProperty({
//         row: false,
//         column: false,
//         body: true,
//       });
//     }
//   }, [data]);

//   useEffect(() => {
//     if (!Attach) return;
//     setWidth(dimensions?.width - 73);
//     setHeight(dimensions?.height - 73);
//   }, [dimensions]);

//   // Grid without types
//   const handleKeyPress = (e) => {
//     const exists = Event && Event.some((item) => item[0] === 'KeyPress');
//     if (!exists) return;

//     const isAltPressed = e.altKey ? 4 : 0;
//     const isCtrlPressed = e.ctrlKey ? 2 : 0;
//     const isShiftPressed = e.shiftKey ? 1 : 0;
//     const charCode = e.key.charCodeAt(0);
//     let shiftState = isAltPressed + isCtrlPressed + isShiftPressed;

//     let event = JSON.stringify({
//       Event: {
//         EventName: 'KeyPress',
//         ID: data?.ID,
//         Info: [e.key, charCode, e.keyCode, shiftState],
//       },
//     });
//     console.log(event);
//     socket.send(event);
//   };

//   return (
//     <div
//       tabIndex='0'
//       onKeyDown={handleKeyPress}
//       id={data.ID}
//       style={{
//         ...style,
//         height,
//         width,
//         border: '1px solid black',
//         overflow: !ColTitles ? 'auto' : 'hidden',
//         background: 'white',
//         display: Visible == 0 ? 'none' : 'block',
//         overflowX: HScroll == -3 ? 'scroll' : HScroll == -1 || HScroll == -2 ? 'auto' : 'hidden',
//         overflowY: VScroll == -3 ? 'scroll' : VScroll == -1 || HScroll == -2 ? 'auto' : 'hidden',
//       }}
//     >
//       {/* Table have column */}
//       {ColTitles && (
//         <div style={{ display: 'flex' }}>
//           {RowTitles?.length > 1 ? (
//             <Cell
//               key={0}
//               cellWidth={TitleWidth && TitleWidth}
//               title={''}
//               column={0}
//               row={0}
//               isColumn={tableProperty.column}
//               isRow={tableProperty.row}
//               isBody={tableProperty.body}
//               selectedGrid={selectedGrid}
//               onClick={(row, column) => handleGridClick(row, column, 'column')}
//             />
//           ) : null}

//           {ColTitles.map((heading, column) => {
//             return (
//               <Cell
//                 fontColor={ColTitleFCol}
//                 bgColor={ColTitleBCol}
//                 isColumn={tableProperty.column}
//                 isRow={tableProperty.row}
//                 isBody={tableProperty.body}
//                 selectedGrid={selectedGrid}
//                 cellWidth={CellWidths && CellWidths[column]}
//                 title={heading}
//                 column={column + 1}
//                 onClick={(row, column) => handleGridClick(row, column, 'column')}
//                 highLightMe={tableProperty.body && selectedGrid.column === column + 1}
//                 row={0}
//                 key={column + 1}
//               />
//             );
//           })}
//         </div>
//       )}

//       {/* Table not have column */}
//       {!ColTitles ? (
//         <div style={{ display: 'flex' }}>
//           {generateHeader(size).map((letter, i) => {
//             return i < size ? (
//               <Cell
//                 isColumn={tableProperty.column}
//                 isRow={tableProperty.row}
//                 isBody={tableProperty.body}
//                 highLightMe={tableProperty.body && selectedGrid.column === i}
//                 row={0}
//                 title={letter}
//                 column={i}
//                 selectedGrid={selectedGrid}
//                 onClick={(row, column) => handleGridClick(row, column, 'column')}
//                 key={i}
//               />
//             ) : null;
//           })}
//         </div>
//       ) : null}

//       {/* Grid Body with types and without types you can find that check in the Cell component */}

//       {Values?.map((tableValues, row) => {
//         return (
//           <div
//             style={{
//               display: 'flex',
//             }}
//           >
//             {!ColTitles ? (
//               <Cell
//                 cellWidth={100}
//                 justify='start'
//                 isColumn={tableProperty.column}
//                 isRow={tableProperty.row}
//                 isBody={tableProperty.body}
//                 onClick={(row, column) => handleGridClick(row, column, 'row')}
//                 column={0}
//                 key={0}
//                 row={row + 1}
//                 title={row + 1}
//                 selectedGrid={selectedGrid}
//                 highLightMe={tableProperty.body && selectedGrid.row === row + 1}
//               />
//             ) : null}
//             {RowTitles ? (
//               <Cell
//                 fontColor={RowTitleFCol}
//                 bgColor={RowTitleBCol}
//                 cellWidth={TitleWidth && TitleWidth}
//                 title={RowTitles[row]}
//                 selectedGrid={selectedGrid}
//                 row={row + 1}
//                 isColumn={tableProperty.column}
//                 isRow={tableProperty.row}
//                 isBody={tableProperty.body}
//                 highLightMe={tableProperty.body && selectedGrid.row === row + 1}
//                 onClick={(row, column) => handleGridClick(row, column, 'row')}
//                 column={0}
//                 key={0}
//                 justify='start'
//               />
//             ) : null}
//             {tableValues.map((value, column) => {
//               let cellType = CellTypes && CellTypes[row][column];
//               const type = findDesiredData(Input && Input[cellType - 1]);
//               const event = data?.Properties?.Event && data?.Properties?.Event;
//               const backgroundColor = BCol && BCol[cellType - 1];
//               const cellFont = findDesiredData(CellFonts && CellFonts[cellType - 1]);

//               return (
//                 <Cell
//                   justify={type ? '' : typeof value == 'string' ? 'start' : 'end'}
//                   cellWidth={CellWidths && CellWidths[column]}
//                   title={value}
//                   formattedValue={FormattedValues && FormattedValues[row][column]}
//                   type={type}
//                   parent={event}
//                   row={row + 1}
//                   location='inGrid'
//                   column={column + 1}
//                   selectedGrid={selectedGrid}
//                   onClick={(row, column) => handleGridClick(row, column, 'body')}
//                   isColumn={tableProperty.column}
//                   isRow={tableProperty.row}
//                   isBody={tableProperty.body}
//                   values={Values}
//                   ShowInput={ShowInput}
//                   bgColor={backgroundColor}
//                   cellFont={cellFont}
//                   formatString={FormatString && FormatString[cellType - 1]}
//                   key={column + 1}
//                 />
//               );
//             })}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Grid;

import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  setStyle,
  generateHeader,
  extractStringUntilSecondPeriod,
  rgbColor,
} from "../../utils";
import { useResizeObserver, useAppData } from "../../hooks";
import GridEdit from "./GridEdit";
import GridSelect from "./GridSelect";
import GridButton from "./GridButton";
import GridCell from "./GridCell";
import Header from "./Header";
import GridLabel from "./GridLabel";

const Component = ({ key, data, row, column }) => {
  if (data?.type == "Edit") return <GridEdit data={data} />;
  else if (data?.type == "Button") return <GridButton data={data} />;
  else if (data?.type == "cell") return <GridCell data={data} />;
  else if (data?.type == "header") return <Header data={data} />;
  else if (data?.type == "Combo") return <GridSelect data={data} />;
  else if (data?.type == "Label") return <GridLabel data={data} />;
};

const Grid = ({ data }) => {
  const gridId = data?.ID;
  const {
    findDesiredData,
    socket,
    proceed,
    setProceed,
    proceedEventArray,
    setProceedEventArray,
  } = useAppData();
  console.log("waiting", { proceed, setProceed, proceedEventArray });

  const [eventId, setEventId] = useState(null);

  const dimensions = useResizeObserver(
    document.getElementById(extractStringUntilSecondPeriod(data?.ID))
  );

  const gridRef = useRef(null);

  const {
    Size,
    Values,
    Input,
    ColTitles,
    RowTitles,
    CellWidths,
    CellHeights,
    Visible,
    CurCell,
    CellTypes,
    ShowInput,
    FormattedValues,
    BCol,
    CellFonts,
    RowTitleBCol,
    RowTitleFCol,
    ColTitleBCol,
    ColTitleFCol,
    TitleHeight,
    TitleWidth,
    FormatString,
    VScroll = 0,
    HScroll = 0,
    Attach,
    Event,
  } = data?.Properties;

  const [height, setHeight] = useState(Size[0]);
  const [width, setWidth] = useState(Size[1]);
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  const [selectedRow, setSelectedRow] = useState(
    !CurCell ? (RowTitles?.length > 0 ? 1 : 0) : CurCell[0]
  );
  const [selectedColumn, setSelectedColumn] = useState(
    !CurCell ? (RowTitles?.length > 0 ? 1 : 0) : CurCell[1]
  );

  const style = setStyle(data?.Properties);

  useEffect(() => {
    if (!Attach) return;
    setWidth(dimensions?.width - 73);
    setHeight(dimensions?.height - 73);
  }, [dimensions]);

  useEffect(() => {
    if (!ColTitles) setColumns(Values[0]?.length + 1);
    else setColumns(ColTitles?.length);

    if (Values) setRows(Values?.length + 1);
  }, [data]);

  const handleCellMove = (row, column, mouseClick) => {
    if (column > columns || column == 0) return;
    console.log("waiting handle cell move", row, column)
    const cellChanged = JSON.parse(localStorage.getItem("isChanged"));

    const cellMoveEvent = JSON.stringify({
      Event: {
        ID: data?.ID,
        EventName: "CellMove",
        Info: [
          row,
          column,
          0,
          0,
          mouseClick,
          cellChanged && cellChanged.isChange ? 1 : 0,
          cellChanged && cellChanged ? cellChanged.value : "",
        ],
      },
    });

    const exists = Event && Event?.some((item) => item[0] === "CellMove");
    if (!exists) return;
    console.log( "waiting handle cell move event", cellMoveEvent);
    socket.send(cellMoveEvent);
    localStorage.setItem(
      "isChanged",
      JSON.stringify({
        isChange: false,
        value: "",
      })
    );
  };

  const waitForProceed = (localStorageBool) => {
    return new Promise((resolve) => {
      const checkProceed = () => {
        if (localStorageBool || proceed !== null) {
          console.log("waiting checking proceed event",eventId, proceedEventArray[eventId], proceedEventArray, )
          if (localStorageBool || proceedEventArray[eventId] === 1) {
            resolve();
            console.log({proceedEventArray})
            setProceed(false);
            setProceedEventArray((prev) => ({ ...prev, [eventId]: 0 }));
          } else {
            return;
          }
        }
      };
      setTimeout(() => {
        checkProceed();
      }, 100); 
    });
  };

  const handleKeyDown = (event) => {
    
    const isAltPressed = event.altKey ? 4 : 0;
    const isCtrlPressed = event.ctrlKey ? 2 : 0;
    const isShiftPressed = event.shiftKey ? 1 : 0;
    const charCode = event.key.charCodeAt(0);
    const eventId = uuidv4();
    setEventId(eventId);
    let shiftState = isAltPressed + isCtrlPressed + isShiftPressed;

    const exists = Event && Event?.some((item) => item[0] === "KeyPress");

    const keyPressEvent = JSON.stringify({
      Event: {
        EventName: "KeyPress",
        ID: data?.ID,
        EventID: eventId,
        Info: [event.key, charCode, event.keyCode, shiftState],
      },
    });

    if (exists) {
      console.log(keyPressEvent);
      socket.send(keyPressEvent);
    }


    // setTimeout(()=>{
    // }, 100)

    const isNavigationKeys = [
      "ArrowRight",
      "ArrowLeft",
      "ArrowUp",
      "ArrowDown",
    ].some((key) => event.key === key);

    if (isNavigationKeys) {
      gridRef.current.focus();
    }

    let localStoragValue = JSON.parse(localStorage.getItem(data?.ID));
    console.log("waiting initial local storage", localStoragValue)

    const updatePosition = async () => {
      if (event.key === "ArrowRight") {
        console.log("waiting in handle key down", { proceed, setProceed, proceedEventArray });
        console.log("waiting local storage getitem", localStorage.getItem(eventId))
        console.log("waiting starting arrow right")
        await waitForProceed(localStorage.getItem(eventId));
        console.log("waiting await proceed done")
        setSelectedColumn((prev) => Math.min(prev + 1, columns));
        if (!localStoragValue) {
          console.log("writing local storage", JSON.stringify({
            Event: {
              CurCell: [
                selectedRow,
                RowTitles?.length > 0
                  ? selectedColumn + 1
                  : selectedColumn + 2,
              ],
            },
          }) )
          if (RowTitles?.length > 0 && selectedColumn == columns) return;
          
          localStorage.setItem(
            data?.ID,   
            JSON.stringify({
              Event: {
                CurCell: [
                  selectedRow,
                  RowTitles?.length > 0
                    ? selectedColumn + 1
                    : selectedColumn + 2,
                ],
              },
            })
          );
        } 
        else {
          if (RowTitles?.length > 0 && selectedColumn == columns) return;
          console.log("writing local storage")
          console.log("writing local storage", JSON.stringify({
            Event: {
              CurCell: [
                selectedRow,
                RowTitles?.length > 0
                  ? selectedColumn + 1
                  : selectedColumn + 2,
              ],
              Values: localStoragValue?.Event?.Values,
            },
          }) )
          
          localStorage.setItem(
            data?.ID,
            JSON.stringify({
              Event: {
                CurCell: [
                  selectedRow,
                  RowTitles?.length > 0
                    ? selectedColumn + 1
                    : selectedColumn + 2,
                ],
                Values: localStoragValue?.Event?.Values,
              },
            })
          );
        }

        handleCellMove(
          selectedRow,
          RowTitles?.length > 0 ? selectedColumn + 1 : selectedColumn + 2,
          0
        );
      } else if (event.key === "ArrowLeft") {
        await waitForProceed();
        setSelectedColumn((prev) =>
          Math.max(prev - 1, RowTitles?.length > 0 ? 1 : 0)
        );
        if (!localStoragValue) {
          if (RowTitles?.length > 0 && selectedColumn == 1) return;

          localStorage.setItem(
            data?.ID,
            JSON.stringify({
              Event: {
                CurCell: [
                  selectedRow,
                  RowTitles?.length > 0 ? selectedColumn - 1 : selectedColumn,
                ],
              },
            })
          );
        } else {
          if (RowTitles?.length > 0 && selectedColumn == 1) return;
          localStorage.setItem(
            data?.ID,
            JSON.stringify({
              Event: {
                CurCell: [
                  selectedRow,
                  RowTitles?.length > 0 ? selectedColumn - 1 : selectedColumn,
                ],
                Values: localStoragValue?.Event?.Values,
              },
            })
          );
        }
        handleCellMove(
          selectedRow,
          RowTitles?.length > 0 ? selectedColumn - 1 : selectedColumn,
          0
        );
      } else if (event.key === "ArrowUp") {
        await waitForProceed();
        setSelectedRow((prev) => Math.max(prev - 1, 1));
        if (!localStoragValue) {
          if (selectedRow == 1 && RowTitles?.length > 0) return;

          localStorage.setItem(
            data?.ID,
            JSON.stringify({
              Event: {
                CurCell: [
                  selectedRow - 1,
                  RowTitles?.length > 0 ? selectedColumn : selectedColumn + 1,
                ],
              },
            })
          );
        } else {
          if (selectedRow == 1 && RowTitles?.length > 0) return;
          localStorage.setItem(
            data?.ID,
            JSON.stringify({
              Event: {
                CurCell: [
                  selectedRow - 1,
                  RowTitles?.length > 0 ? selectedColumn : selectedColumn + 1,
                ],
                Values: localStoragValue?.Event?.Values,
              },
            })
          );
        }
        handleCellMove(
          selectedRow - 1,
          RowTitles?.length > 0 ? selectedColumn : selectedColumn + 1,
          0
        );
      } else if (event.key === "ArrowDown") {
        await waitForProceed();
        setSelectedRow((prev) => Math.min(prev + 1, rows - 1));
        if (!localStoragValue) {
          if (selectedRow == rows - 1) return;
          localStorage.setItem(
            data?.ID,
            JSON.stringify({
              Event: {
                CurCell: [
                  selectedRow + 1,
                  RowTitles?.length > 0 ? selectedColumn : selectedColumn + 1,
                ],
              },
            })
          );
        } else {
          if (selectedRow == rows - 1) return;

          localStorage.setItem(
            data?.ID,
            JSON.stringify({
              Event: {
                CurCell: [
                  selectedRow + 1,
                  RowTitles?.length > 0 ? selectedColumn : selectedColumn + 1,
                ],
                Values: localStoragValue?.Event?.Values,
              },
            })
          );
        }
        handleCellMove(
          selectedRow + 1,
          RowTitles?.length > 0 ? selectedColumn : selectedColumn + 1,
          0
        );
      }
    };

    updatePosition();
    // setTimeout(()=>{
    //   updatePosition();
    // }, 200)

   
  };

  const modifyGridData = () => {
    let data = [];
    // Push the header Information
    if (ColTitles) {
      // Add the empty cell in the header when the default Row Titles is present
      let header = [];
      let emptyobj = {
        value: "",
        type: "header",
        width: !TitleWidth ? 100 : TitleWidth,
        height: !TitleHeight ? 20 : TitleHeight,
      };

      // push the obj when TitleWidth is present
      !TitleWidth && !RowTitles ? null : header.push(emptyobj);

      for (let i = 0; i < ColTitles?.length; i++) {
        let obj = {
          value: ColTitles[i],
          type: "header",
          backgroundColor: rgbColor(ColTitleBCol),
          color: rgbColor(ColTitleFCol),
          width: !CellWidths
            ? 100
            : Array.isArray(CellWidths)
            ? CellWidths[i]
            : CellWidths,
          height: !TitleHeight ? 20 : TitleHeight,
        };

        header.push(obj);
      }

      // header = RowTitles
      //   ? [
      //       {
      //         value: '',
      //         type: 'header',
      //         width: RowTitles ? (!TitleWidth ? 100 : TitleWidth) : CellWidths,
      //       },
      //       ...header,
      //     ]
      //   : [...header];

      data.push(header);
    } else if (!ColTitles) {
      let headerArray = generateHeader(columns).map((alphabet) => {
        return {
          value: alphabet,
          type: "header",
          width: !TitleWidth ? 100 : TitleWidth,
          height: !TitleHeight ? 20 : TitleHeight,
        };
      });
      data.push(headerArray);
    }

    // Make the body the Grid Like if it have Input Array that means it have types
    if (!Input) {
      for (let i = 0; i < Values?.length; i++) {
        let cellType = CellTypes && CellTypes[i][0];
        const backgroundColor = BCol && BCol[cellType - 1];
        let body = [];
        let obj = {
          type: "cell",
          value: RowTitles ? RowTitles[i] : i + 1,
          width: RowTitles ? (!TitleWidth ? 100 : TitleWidth) : 100,
          height: !CellHeights
            ? 20
            : Array.isArray(CellHeights)
            ? CellHeights[i]
            : CellHeights,
          align: "start",
          backgroundColor: rgbColor(backgroundColor),
        };
        TitleWidth == undefined
          ? body.push(obj)
          : TitleWidth == 0
          ? null
          : body.push(obj);
        for (let j = 0; j <= columns; j++) {
          let obj = {
            type: "cell",
            value: Values[i][j],
            width: !CellWidths
              ? 100
              : Array.isArray(CellWidths)
              ? CellWidths[j]
              : CellWidths,
            height: !CellHeights
              ? 20
              : Array.isArray(CellHeights)
              ? CellHeights[j]
              : CellHeights,
            align: "end",
          };
          body.push(obj);
        }
        data.push(body);
      }
    } else if (Input) {
      for (let i = 0; i < Values?.length; i++) {
        let body = [];
        let cellType = CellTypes && CellTypes[i][0];
        const backgroundColor = BCol && BCol[cellType - 1];

        // Decide to add the RowTitles If the TitleWidth is Greater than 0
        let obj = {
          type: "cell",
          value: RowTitles ? RowTitles[i] : i + 1,
          width: !TitleWidth ? 100 : TitleWidth,
          height: !CellHeights
            ? 20
            : Array.isArray(CellHeights)
            ? CellHeights[i]
            : CellHeights,
          align: "start",
          backgroundColor: rgbColor(backgroundColor),
        };

        TitleWidth == undefined
          ? body.push(obj)
          : TitleWidth == 0
          ? null
          : body.push(obj);

        for (let j = 0; j < columns; j++) {
          let cellType = CellTypes && CellTypes[i][j];
          const type = findDesiredData(
            Input?.length > 1 ? Input && Input[cellType - 1] : Input[0]
          );
          const event = data?.Properties?.Event && data?.Properties?.Event;
          const backgroundColor = BCol && BCol[cellType - 1];
          const cellFont = findDesiredData(
            CellFonts && CellFonts[cellType - 1]
          );

          let obj = {
            type: !type ? "cell" : type?.Properties?.Type,
            value: Values[i][j],
            event,
            backgroundColor: rgbColor(backgroundColor),
            cellFont,
            typeObj: type,
            formattedValue: FormattedValues && FormattedValues[i][j],
            formatString: FormatString && FormatString[cellType - 1],
            width: !CellWidths
              ? 100
              : Array.isArray(CellWidths)
              ? CellWidths[j]
              : CellWidths,
            height: !CellHeights
              ? 20
              : Array.isArray(CellHeights)
              ? CellHeights[i]
              : CellHeights,
          };
          body.push(obj);
        }
        data.push(body);
      }
    }

    return data;
  };

  const handleCellClick = (row, column) => {
    setSelectedColumn(column);
    setSelectedRow(row);

    if (row == selectedRow && column == selectedColumn) return;

    let localStoragValue = JSON.parse(localStorage.getItem(data?.ID));
    if (!localStoragValue)
      localStorage.setItem(
        data?.ID,
        JSON.stringify({
          Event: {
            CurCell: [row, RowTitles?.length > 0 ? column : column + 1],
          },
        })
      );
    else {
      localStorage.setItem(
        data?.ID,
        JSON.stringify({
          Event: {
            CurCell: [row, RowTitles?.length > 0 ? column : column + 1],
            Values: localStoragValue?.Event?.Values,
          },
        })
      );
    }

    handleCellMove(row, column, 1);

    // handleData(
    //   {
    //     ID: data?.ID,
    //     Properties: {
    //       CurCell: [row, column],
    //     },
    //   },
    //   'WS'
    // );

    // reRender();
    //  handleCellMove(row, column + 1, Values[row - 1][column]);
  };

  const gridData = modifyGridData();

  return (
    <div
      tabIndex={0}
      ref={gridRef}
      onKeyDown={handleKeyDown}
      id={data?.ID}
      style={{
        ...style,
        height,
        width,
        border: "1px solid black",
        overflow: !ColTitles ? "auto" : "hidden",
        background: "white",
        display: Visible == 0 ? "none" : "block",
        overflowX:
          HScroll == -3
            ? "scroll"
            : HScroll == -1 || HScroll == -2
            ? "auto"
            : "hidden",
        overflowY:
          VScroll == -3
            ? "scroll"
            : VScroll == -1 || HScroll == -2
            ? "auto"
            : "hidden",
      }}
    >
      {gridData?.map((row, rowi) => {
        return (
          <div style={{ display: "flex" }} id={`row-${rowi}`}>
            {row.map((data, columni) => {
              const isFocused =
                selectedRow === rowi && selectedColumn === columni;

              return (
                <div
                  onClick={(e) => {
                    handleCellClick(rowi, columni);
                    // handleCellMove(rowi, columni + 1, '');
                  }}
                  id={`${gridId}.r${rowi + 1}.c${columni + 1}`}
                  style={{
                    borderRight: isFocused
                      ? "1px solid blue"
                      : "1px solid  #EFEFEF",
                    borderBottom: isFocused
                      ? "1px solid blue"
                      : "1px solid  #EFEFEF",
                    fontSize: "12px",
                    minHeight: `${data?.height}px`,
                    maxHeight: `${data?.height}px`,
                    minWidth: `${data?.width}px`,
                    maxWidth: `${data?.width}px`,
                    minheight: `${data?.height}px`,
                    maxheight: `${data?.height}px`,
                    backgroundColor:
                      selectedColumn === columni && data.type == "header"
                        ? "lightblue"
                        : rgbColor(data?.backgroundColor),
                    textAlign: data.type == "header" ? "center" : "left",
                    overflow: "hidden",
                  }}
                >
                  <Component
                    key={data?.type}
                    data={{
                      ...data,
                      row: rowi,
                      column: columni,
                      gridValues: Values,
                      gridEvent: Event,
                      showInput: ShowInput,
                      gridId: gridId,
                      focused: isFocused,
                      backgroundColor: data?.backgroundColor,
                    }}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
