import React from 'react';
import { Row, Col } from 'reactstrap';
import { Select, Input, Button, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from '@chakra-ui/react';
import { DeleteIcon, AddIcon } from '@chakra-ui/icons';

const Skills = ({ data, handleGlobalAdd, handleGlobalChange, handleGlobalDelete }) => {
  return (
    <div className="add-data__skill">
      <div className="section-title">
        <p>Skills</p>
      </div>
      <Row>
        <Col lg="12">
          <p className="add-data-section__title">Add important skills to show us your talents!</p>
          {data.skills.length > 0 &&
            data.skills.map((value, index) => {
              return (
                <Accordion allowToggle>
                  <AccordionItem>
                    <div className="accordion-title">
                      <AccordionButton h="20">
                        {value.skill === '' ? (
                          <p>(Not Specified)</p>
                        ) : (
                          <div>
                            <p>{value.skill}</p>
                            <p>{value.level}</p>
                          </div>
                        )}
                        <AccordionIcon />
                      </AccordionButton>
                      <DeleteIcon onClick={() => handleGlobalDelete(index, 'skills')} className="delete-button" />
                    </div>
                    <AccordionPanel pb={4}>
                      <Row>
                        <Col lg="6">
                          <p className="add-data-section__title">Skill</p>
                          <Input name="skill" value={value.skill} onChange={(event) => handleGlobalChange(event, index, 'skills')} variant="filled" focusBorderColor="lime" />
                        </Col>
                        <Col lg="6">
                          <p className="add-data-section__title">Level</p>
                          <Select placeholder="Select option" name="level" value={value.level} onChange={(event) => handleGlobalChange(event, index, 'skills')} variant="filled" focusBorderColor="lime">
                            <option value="Novice">Novice</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Skillful">Skillful</option>
                            <option value="Experienced">Experienced</option>
                            <option value="Expert">Expert</option>
                          </Select>
                        </Col>
                      </Row>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              );
            })}
          <Button className="add-button" leftIcon={<AddIcon />} color="#1175D9" bg="white" onClick={() => handleGlobalAdd('skills')}>
            Add one more skill
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Skills;
