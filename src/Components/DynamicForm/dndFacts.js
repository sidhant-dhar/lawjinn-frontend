import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { get } from '../../utils/Remote';
import close from '../../assets/images/close.svg';
import add from '../../assets/images/add.svg';

const DndFacts = (props) => {
  const { changeFacts, facts } = props;

  // const [facts, setFacts] = useState([]);
  const [newFact, setNewFact] = useState('');

  // useEffect(() => {
  //   get({ id: factId }, '/additionalfacts').then((res) => {
  //     const factsWithId = res.data.map((elem, id) => {
  //       return {
  //         value: elem,
  //         id: id.toString(),
  //       };
  //     });
  //     setFacts(factsWithId);
  //   });
  // }, [factId]);

  const updateFacts = (value, i) => {
    const newFacts = facts.map((e, index) => {
      if (i === index) {
        e.value = value;
        return e;
      }
      return e;
    });

    changeFacts(newFacts);
    console.log(newFacts);
  };

  const removeFact = (id) => {
    const newFacts = facts.filter((e) => {
      return e.id !== id;
    });

    changeFacts(newFacts);
  };

  const addNewFact = () => {
    const newId = facts.length;
    const payload = {
      id: newId.toString(),
      value: newFact,
    };

    const tempFacts = JSON.parse(JSON.stringify(facts));
    if (newFact) tempFacts.push(payload);
    setNewFact('');
    changeFacts(tempFacts);
  };

  const ondragendOfFacts = (result) => {
    console.log(result);
    const { destination, source } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const tempFacts = Array.from(facts);
    const temp = tempFacts[source.index];
    tempFacts[source.index] = tempFacts[destination.index];
    tempFacts[destination.index] = temp;
    console.log(tempFacts);

    changeFacts(tempFacts);
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    ...draggableStyle,
    opacity: isDragging ? '0.7' : '1',
    backgroundColor: isDragging ? 'var(--primary-blue)' : '#fff',
    color: isDragging ? '#fff' : '#010102',
  });

  return (
    <div>
      <p className='mx-3 FormTemplate__additonalFactsHeading'>
        The facts of the plaint are presented below. You can edit, or add your own. You can also
        reorder them if you wish to do so
      </p>

      <Accordion className='mx-3'>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Card.Header} variant='link' eventKey='0'>
              Addition Facts
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey='0'>
            <Card.Body>
              <>
                <DragDropContext onDragEnd={ondragendOfFacts}>
                  <Droppable droppableId='facts'>
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {provided.placeholder}

                        {facts.length > 0 &&
                          facts.map((elem, i) => {
                            return (
                              <div key={elem.id}>
                                <Draggable draggableId={elem.id} index={i}>
                                  {(provided, snapshot) => (
                                    <div
                                      className='m-4 p-2 mx-auto d-flex FormTemplate__factsCard'
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      ref={provided.innerRef}
                                      style={getItemStyle(
                                        snapshot.isDragging,
                                        provided.draggableProps.style,
                                      )}
                                    >
                                      <p className='w-100 mr-3'>
                                        <span className='font-weight-bold'>{i + 1}.</span>{' '}
                                        {elem.value}
                                      </p>
                                      <img
                                        src={close}
                                        alt='close'
                                        role='button'
                                        tabIndex='-1'
                                        onKeyDown={() => removeFact(elem.id)}
                                        onClick={() => removeFact(elem.id)}
                                        className='FormTemplate__closeButton'
                                      />
                                    </div>
                                  )}
                                </Draggable>
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
                <div className='d-flex w-75 mx-auto'>
                  <p>Add new Fact</p>
                  <textarea
                    value={newFact}
                    onChange={(e) => setNewFact(e.target.value)}
                    className='w-100'
                  />
                  <img
                    src={add}
                    alt='add'
                    role='button'
                    tabIndex='-1'
                    onKeyDown={() => addNewFact()}
                    onClick={() => addNewFact()}
                    height='40'
                    width='40'
                  />
                </div>
              </>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
};

export default DndFacts;
