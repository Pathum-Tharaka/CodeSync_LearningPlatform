import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  createLearningPlan, 
  getLearningPlans, 
  updateLearningPlan, 
  deleteLearningPlan,
  addTopicToPlan,
  updateTopic,
  deleteTopic,
  addResourceToTopic,
  updateResource,
  deleteResource
} from '../../Redux/LearningPlan/Action';
import { Button, Modal, Form, Input, DatePicker, Checkbox, List, Card, Space, message, Collapse, Tag, Alert, Spin } from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  LinkOutlined,
  FileAddOutlined,
  BookOutlined
} from '@ant-design/icons';
import moment from 'moment';
import "./LearningPlan.css";


const { Panel } = Collapse;
const { TextArea } = Input;

const LearningPlan = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { learningPlan } = useSelector((store) => store);
  const [planForm] = Form.useForm();
  const [topicForm] = Form.useForm();
  const [resourceForm] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePanelKey, setActivePanelKey] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [planModal, setPlanModal] = useState({
    visible: false,
    mode: 'create',
    currentPlan: null
  });
  const [topicModal, setTopicModal] = useState({
    visible: false,
    mode: 'create',
    currentTopic: null,
    planId: null
  });
  const [resourceModal, setResourceModal] = useState({
    visible: false,
    mode: 'create',
    currentResource: null,
    topicId: null
  });

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        if (isMounted) setLoading(true);
        await dispatch(getLearningPlans(token));
      } catch (err) {
        if (isMounted) setError("Failed to load learning plans. Please try again.");
        console.error("Error:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (token) fetchData();
    
    return () => {
      isMounted = false;
    };
  }, [dispatch, token]);

  // Handle creation of a new learning plan
  const handleCreatePlan = async (values) => {
    try {
      await dispatch(createLearningPlan({
        jwt: token,
        planData: values
      }));
      setPlanModal({...planModal, visible: false});
      planForm.resetFields();
      message.success('Learning plan created successfully');
    } catch (err) {
      message.error(err.message || 'Failed to create learning plan');
    }
  };

  // Handle updating an existing learning plan
  const handleUpdatePlan = async (values) => {
    try {
      await dispatch(updateLearningPlan({
        jwt: token,
        planId: planModal.currentPlan.id,
        planData: values
      }));
      setPlanModal({...planModal, visible: false});
      planForm.resetFields();
      message.success('Learning plan updated successfully');
    } catch (err) {
      message.error(err.message || 'Failed to update learning plan');
    }
  };

  // Handle deletion of a learning plan with confirmation
  const handleDeletePlan = (planId) => {
    Modal.confirm({
      title: 'Delete Learning Plan',
      content: 'Are you sure you want to delete this learning plan?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      async onOk() {
        try {
          await dispatch(deleteLearningPlan({
            jwt: token,
            planId
          }));
          message.success('Learning plan deleted successfully');
        } catch (err) {
          message.error(err.message || 'Failed to delete learning plan');
        }
      }
    });
  };

  // Function to handle the creation of a new topic under a learning plan
  const handleCreateTopic = async (values) => {
    try {
      await dispatch(addTopicToPlan({
        jwt: token,
        planId: topicModal.planId,
        topicData: {
          ...values,
          targetCompletionDate: values.targetCompletionDate?.format('YYYY-MM-DD') || null
        }
      }));
      setTopicModal({...topicModal, visible: false});
      topicForm.resetFields();
      message.success('Topic added successfully');
    } catch (err) {
      message.error(err.message || 'Failed to add topic');
    }
  };

  // Function to handle updating an existing topic
  const handleUpdateTopic = async (values) => {
    try {
      await dispatch(updateTopic({
        jwt: token,
        topicId: topicModal.currentTopic.id,
        topicData: {
          ...values,
          targetCompletionDate: values.targetCompletionDate?.format('YYYY-MM-DD') || null
        }
      }));
      setTopicModal({...topicModal, visible: false});
      topicForm.resetFields();
      message.success('Topic updated successfully');
    } catch (err) {
      message.error(err.message || 'Failed to update topic');
    }
  };

  // Handle deletion of a topic with confirmation prompt
  const handleDeleteTopic = (topicId) => {
    Modal.confirm({
      title: 'Delete Topic',
      content: 'Are you sure you want to delete this topic?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      async onOk() {
        try {
          await dispatch(deleteTopic({
            jwt: token,
            topicId
          }));
          message.success('Topic deleted successfully');
        } catch (err) {
          message.error(err.message || 'Failed to delete topic');
        }
      }
    });
  };

  // Function to handle the creation of a new resource under a topic
  const handleCreateResource = async (values) => {
    try {
      await dispatch(addResourceToTopic({
        jwt: token,
        topicId: resourceModal.topicId,
        resourceData: values
      }));
      setResourceModal({...resourceModal, visible: false});
      resourceForm.resetFields();
      message.success('Resource added successfully');
    } catch (err) {
      message.error(err.message || 'Failed to add resource');
    }
  };

// Function to handle updating an existing resource
  const handleUpdateResource = async (values) => {
    try {
      await dispatch(updateResource({
        jwt: token,
        resourceId: resourceModal.currentResource.id,
        resourceData: values
      }));
      setResourceModal({...resourceModal, visible: false});
      resourceForm.resetFields();
      message.success('Resource updated successfully');
    } catch (err) {
      message.error(err.message || 'Failed to update resource');
    }
  };

// Handle deletion of a resource with confirmation prompt
  const handleDeleteResource = (resourceId) => {
    Modal.confirm({
      title: 'Delete Resource',
      content: 'Are you sure you want to delete this resource?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      async onOk() {
        try {
          await dispatch(deleteResource({
            jwt: token,
            resourceId
          }));
          message.success('Resource deleted successfully');
        } catch (err) {
          message.error(err.message || 'Failed to delete resource');
        }
      }
    });
  };

// Function to show the Plan Modal for creating or editing a plan
const showPlanModal = (mode = 'create', plan = null) => {
    setPlanModal({
      visible: true,
      mode,
      currentPlan: plan
    });
    if (mode === 'edit') {
      planForm.setFieldsValue({
        title: plan.title,
        description: plan.description
      });
    }
  };

// Function to show the Topic Modal for creating or editing a topic
const showTopicModal = (mode = 'create', topic = null, planId = null) => {
    setTopicModal({
      visible: true,
      mode,
      currentTopic: topic,
      planId
    });
    if (mode === 'edit') {
      topicForm.setFieldsValue({
        title: topic.title,
        description: topic.description,
        completed: topic.completed,
        targetCompletionDate: topic.targetCompletionDate ? moment(topic.targetCompletionDate) : null
      });
    }
  };

// Function to show the Resource Modal for creating or editing a resource
const showResourceModal = (mode = 'create', resource = null, topicId = null) => {
    setResourceModal({
      visible: true,
      mode,
      currentResource: resource,
      topicId
    });
    if (mode === 'edit') {
      resourceForm.setFieldsValue({
        url: resource.url,
        description: resource.description
      });
    }
  };

  // Handles panel expansion and selection when a user clicks a learning plan
  const handlePanelChange = (key) => {
    setActivePanelKey(key);
    if (key.length > 0) {
      const planId = key[0];
      const selected = learningPlan.plans.find(plan => plan.id === planId);
      setSelectedPlan(selected);
    } else {
      setSelectedPlan(null);
    }
  };

  // Show an error alert if data failed to load
  if (error) {
    return (
      <div className="p-8">
        <div className="text-center py-10">
          <Alert message="Error" description={error} type="error" showIcon />
          <Button 
            type="primary" 
            onClick={() => window.location.reload()}
            className="mt-4"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // Show loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center py-10">
          <Spin size="large" />
          <p>Loading your learning plans...</p>
        </div>
      </div>
    );
  }

  // Main return block rendering the learning plans and "New Learning Plan" button
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <BookOutlined className="mr-2" /> My Learning Plans
        </h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showPlanModal()}
        >
          New Learning Plan
        </Button>
      </div>

      // Conditionally render message if there are no learning plans
      {learningPlan.plans?.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed rounded-lg">
          <FileAddOutlined className="text-4xl text-gray-400 mb-4" />
          <p className="text-lg text-gray-600">No learning plans yet</p>
          <Button 
            type="primary" 
            className="mt-4"
            onClick={() => showPlanModal()}
          >
            Create Your First Plan
          </Button>
        </div>
      ) : (
        <>
          <Collapse 
            activeKey={activePanelKey}
            onChange={handlePanelChange}
            className="mb-6"
          >
            {learningPlan.plans?.map((plan) => (
              <Panel 
                header={
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{plan.title}</span>
                    <div>
                      <Tag color="blue">{plan.topics?.length || 0} Topics</Tag>
                    </div>
                  </div>
                }
                key={plan.id.toString()}
                extra={
                  <Space>
                    <Button
                      size="small"
                      icon={<PlusOutlined />}
                      onClick={(e) => {
                        e.stopPropagation();
                        showTopicModal('create', null, plan.id);
                      }}
                    />
                    <Button
                      size="small"
                      icon={<EditOutlined />}
                      onClick={(e) => {
                        e.stopPropagation();
                        showPlanModal('edit', plan);
                      }}
                    />
                    <Button
                      size="small"
                      icon={<DeleteOutlined />}
                      danger
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePlan(plan.id);
                      }}
                    />
                  </Space>
                }
              >
                <div className="mb-4">
                  <p className="text-gray-700">{plan.description}</p>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg">Topics</h3>
                    <Button
                      type="primary"
                      size="small"
                      icon={<PlusOutlined />}
                      onClick={() => showTopicModal('create', null, plan.id)}
                    >
                      Add Topic
                    </Button>
                  </div>

                  {plan.topics?.length > 0 ? (
                    <List
                      dataSource={plan.topics}
                      renderItem={(topic) => (
                        <List.Item className="!px-0">
                          <Card
                            size="small"
                            className="w-full"
                            title={
                              <div className="flex items-center">
                                <Checkbox 
                                  checked={topic.completed}
                                  className="mr-2"
                                  onChange={(e) => {
                                    dispatch(updateTopic({
                                      jwt: token,
                                      topicId: topic.id,
                                      topicData: {
                                        ...topic,
                                        completed: e.target.checked
                                      }
                                    }));
                                  }}
                                />
                                <span className={topic.completed ? "line-through" : ""}>
                                  {topic.title}
                                </span>
                              </div>
                            }
                            extra={
                              <Space>
                                <Button
                                  size="small"
                                  icon={<PlusOutlined />}
                                  onClick={() => showResourceModal('create', null, topic.id)}
                                />
                                <Button
                                  size="small"
                                  icon={<EditOutlined />}
                                  onClick={() => showTopicModal('edit', topic, plan.id)}
                                />
                                <Button
                                  size="small"
                                  icon={<DeleteOutlined />}
                                  danger
                                  onClick={() => handleDeleteTopic(topic.id)}
                                />
                              </Space>
                            }
                          >
                            <div className="mb-2">
                              <p className="text-gray-600">{topic.description}</p>
                              {topic.targetCompletionDate && (
                                <div className="mt-2">
                                  <Tag color="orange">
                                    Target: {new Date(topic.targetCompletionDate).toLocaleDateString()}
                                  </Tag>
                                  {new Date(topic.targetCompletionDate) < new Date() && !topic.completed && (
                                    <Tag color="red" className="ml-2">Overdue</Tag>
                                  )}
                                </div>
                              )}
                            </div>

                            {topic.resources?.length > 0 && (
                              <div className="mt-4">
                                <h4 className="font-medium mb-2">Resources:</h4>
                                <List
                                  size="small"
                                  dataSource={topic.resources}
                                  renderItem={(resource) => (
                                    <List.Item className="!px-0">
                                      <div className="flex justify-between items-center w-full">
                                        <div className="flex items-center">
                                          <LinkOutlined className="mr-2 text-blue-500" />
                                          <a 
                                            href={resource.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-blue-500"
                                          >
                                            {resource.description || resource.url}
                                          </a>
                                        </div>
                                        <Space>
                                          <Button
                                            size="small"
                                            icon={<EditOutlined />}
                                            onClick={() => showResourceModal('edit', resource, topic.id)}
                                          />
                                          <Button
                                            size="small"
                                            icon={<DeleteOutlined />}
                                            danger
                                            onClick={() => handleDeleteResource(resource.id)}
                                          />
                                        </Space>
                                      </div>
                                    </List.Item>
                                  )}
                                />
                              </div>
                            )}
                          </Card>
                        </List.Item>
                      )}
                    />
                  ) : (
                    <div className="text-center py-4 border-2 border-dashed rounded-lg">
                      <p className="text-gray-500">No topics yet</p>
                      <Button
                        type="dashed"
                        className="mt-2"
                        icon={<PlusOutlined />}
                        onClick={() => showTopicModal('create', null, plan.id)}
                      >
                        Add First Topic
                      </Button>
                    </div>
                  )}
                </div>
              </Panel>
            ))}
          </Collapse>

          {selectedPlan && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{selectedPlan.title}</h2>
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => showTopicModal('create', null, selectedPlan.id)}
                  >
                    Add Topic
                  </Button>
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => showPlanModal('edit', selectedPlan)}
                  >
                    Edit Plan
                  </Button>
                </Space>
              </div>
              <p className="text-gray-700 mb-4">{selectedPlan.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-medium mb-2">Completion Progress</h3>
                  {selectedPlan.topics?.length > 0 ? (
                    <>
                      <div className="mb-2">
                        <span className="text-gray-600">
                          {selectedPlan.topics.filter(t => t.completed).length} of {selectedPlan.topics.length} topics completed
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ 
                            width: `${(selectedPlan.topics.filter(t => t.completed).length / selectedPlan.topics.length) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-500">No topics to track progress</p>
                  )}
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-medium mb-2">Quick Actions</h3>
                  <Space>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => showTopicModal('create', null, selectedPlan.id)}
                    >
                      Add Topic
                    </Button>
                    <Button
                      icon={<LinkOutlined />}
                      onClick={() => {
                        if (selectedPlan.topics?.length > 0) {
                          showResourceModal('create', null, selectedPlan.topics[0].id);
                        }
                      }}
                      disabled={!selectedPlan.topics || selectedPlan.topics.length === 0}
                    >
                      Add Resource
                    </Button>
                  </Space>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <Modal
        title={planModal.mode === 'create' ? 'Create Learning Plan' : 'Edit Learning Plan'}
        visible={planModal.visible}
        onCancel={() => setPlanModal({...planModal, visible: false})}
        onOk={() => planForm.submit()}
        destroyOnClose
        width={600}
      >
        <Form 
          form={planForm} 
          onFinish={planModal.mode === 'create' ? handleCreatePlan : handleUpdatePlan}
          layout="vertical"
        >
          <Form.Item 
            name="title" 
            label="Plan Title" 
            rules={[
              { required: true, message: 'Please input the plan title!' },
              { max: 100, message: 'Title must be less than 100 characters' }
            ]}
          >
            <Input placeholder="Enter plan title" />
          </Form.Item>
          <Form.Item 
            name="description" 
            label="Description"
            rules={[{ max: 500, message: 'Description must be less than 500 characters' }]}
          >
            <TextArea rows={4} placeholder="Describe what you want to learn" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={topicModal.mode === 'create' ? 'Add New Topic' : 'Edit Topic'}
        visible={topicModal.visible}
        onCancel={() => setTopicModal({...topicModal, visible: false})}
        onOk={() => topicForm.submit()}
        destroyOnClose
        width={600}
      >
        <Form 
          form={topicForm} 
          onFinish={topicModal.mode === 'create' ? handleCreateTopic : handleUpdateTopic}
          layout="vertical"
        >
          <Form.Item 
            name="title" 
            label="Topic Title" 
            rules={[
              { required: true, message: 'Please input the topic title!' },
              { max: 100, message: 'Title must be less than 100 characters' }
            ]}
          >
            <Input placeholder="Enter topic title" />
          </Form.Item>
          <Form.Item 
            name="description" 
            label="Description"
            rules={[{ max: 500, message: 'Description must be less than 500 characters' }]}
          >
            <TextArea rows={3} placeholder="Describe what this topic covers" />
          </Form.Item>
          <Form.Item name="targetCompletionDate" label="Target Completion Date">
            <DatePicker 
              style={{ width: '100%' }} 
              placeholder="Select target date"
            />
          </Form.Item>
          <Form.Item name="completed" valuePropName="checked">
            <Checkbox>Mark as completed</Checkbox>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={resourceModal.mode === 'create' ? 'Add New Resource' : 'Edit Resource'}
        visible={resourceModal.visible}
        onCancel={() => setResourceModal({...resourceModal, visible: false})}
        onOk={() => resourceForm.submit()}
        destroyOnClose
        width={600}
      >
        <Form 
          form={resourceForm} 
          onFinish={resourceModal.mode === 'create' ? handleCreateResource : handleUpdateResource}
          layout="vertical"
        >
          <Form.Item 
            name="url" 
            label="Resource URL" 
            rules={[
              { required: true, message: 'Please input the resource URL!' },
              { type: 'url', message: 'Please enter a valid URL!' }
            ]}
          >
            <Input 
              prefix={<LinkOutlined />} 
              placeholder="https://example.com/resource" 
            />
          </Form.Item>
          <Form.Item 
            name="description" 
            label="Description (Optional)"
            rules={[{ max: 200, message: 'Description must be less than 200 characters' }]}
          >
            <Input placeholder="Brief description of the resource" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LearningPlan;