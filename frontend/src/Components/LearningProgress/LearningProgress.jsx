import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProgressUpdates,
  createProgressUpdate,
  updateProgressUpdate,
  deleteProgressUpdate,
} from "../../Redux/LearningProgress/Action";
import {
  Button,
  Modal,
  Form,
  Input,
  message,
  Select,
  Progress,
  DatePicker,
  Space,
  Card,
  Timeline,
  Tag
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FileTextOutlined,
  ToolOutlined,
  RocketOutlined,
  ClockCircleOutlined,
  TrophyOutlined
} from "@ant-design/icons";
import moment from 'moment';
import "./LearningProgress.css";

const { Option } = Select;
const { RangePicker } = DatePicker;

const LearningProgress = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { updates } = useSelector((store) => store.learningProgress);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    console.log("Fetching progress updates...");
    dispatch(getProgressUpdates(token));
  }, [dispatch]);

  useEffect(() => {
    console.log("Current updates:", updates);
  }, [updates]);

  const handleSubmit = (values) => {
    console.log("Form values:", values);
    const formattedValues = {
      ...values,
      startDate: values.duration[0].toISOString(),
      endDate: values.duration[1].toISOString(),
      duration: values.duration[1].diff(values.duration[0], 'days')
    };
    delete formattedValues.duration;
    console.log("Formatted values:", formattedValues);

    if (editing) {
      dispatch(updateProgressUpdate(token, editing.id, formattedValues));
      message.success("Update edited successfully!");
    } else {
      dispatch(createProgressUpdate(token, formattedValues));
      message.success("New update added!");
    }
    form.resetFields();
    setIsModalOpen(false);
    setEditing(null);
  };

  const handleTemplateChange = (value) => {
    if (value === "tutorial") {
      form.setFieldsValue({
        title: "Completed a Tutorial",
        content: "Finished learning [topic] tutorial.",
        milestone: "Beginner",
        duration: [moment(), moment().add(7, 'days')]
      });
    } else if (value === "skill") {
      form.setFieldsValue({
        title: "Learned a New Skill",
        content: "I learned how to [skill].",
        milestone: "Intermediate",
        duration: [moment(), moment().add(14, 'days')]
      });
    } else if (value === "project") {
      form.setFieldsValue({
        title: "Built a Project",
        content: "I developed a project using [technology].",
        milestone: "Advanced",
        duration: [moment(), moment().add(30, 'days')]
      });
    }
  };

  const getMilestoneColor = (milestone) => {
    switch (milestone?.toLowerCase()) {
      case 'beginner': return 'green';
      case 'intermediate': return 'blue';
      case 'advanced': return 'purple';
      default: return 'default';
    }
  };

  const calculateProgress = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const start = moment(startDate);
    const end = moment(endDate);
    const now = moment();
    const total = end.diff(start, 'days');
    const elapsed = now.diff(start, 'days');
    return Math.min(Math.max(Math.round((elapsed / total) * 100), 0), 100);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Learning Progress Updates</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          Add Update
        </Button>
      </div>

      <div className="updates-container">
        {updates && updates.length > 0 ? (
          updates.map((item) => (
            <Card key={item.id} className="update-card">
              <div className="update-info">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="update-title">{item.title}</h3>
                    <p className="update-content">{item.content}</p>
                  </div>
                  <Tag color={getMilestoneColor(item.milestone)} icon={<TrophyOutlined />}>
                    {item.milestone || 'Beginner'}
                  </Tag>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center mb-2">
                    <ClockCircleOutlined className="mr-2" />
                    <span className="text-gray-600">
                      {moment(item.startDate).format('MMM D, YYYY')} - {moment(item.endDate).format('MMM D, YYYY')}
                    </span>
                  </div>
                  
                  <Progress 
                    percent={calculateProgress(item.startDate, item.endDate)} 
                    status={calculateProgress(item.startDate, item.endDate) >= 100 ? "success" : "active"}
                    strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    }}
                  />
                </div>
              </div>
              
              <div className="update-actions">
                <Button
                  icon={<EditOutlined />}
                  size="small"
                  onClick={() => {
                    setEditing(item);
                    form.setFieldsValue({
                      ...item,
                      duration: [moment(item.startDate), moment(item.endDate)]
                    });
                    setIsModalOpen(true);
                  }}
                />
                <Button
                  icon={<DeleteOutlined />}
                  size="small"
                  danger
                  onClick={() => {
                    dispatch(deleteProgressUpdate(token, item.id));
                    message.success("Update deleted!");
                  }}
                />
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-600">No progress updates yet</h3>
            <p className="text-gray-500 mt-2">Start tracking your learning progress by adding an update</p>
          </div>
        )}
      </div>

      <Modal
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditing(null);
          form.resetFields();
        }}
        onOk={() => form.submit()}
        title={editing ? "Edit Update" : "Add Progress Update"}
        width={600}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          {!editing && (
            <Form.Item label="Choose a Template">
              <Select
                placeholder="Select a template"
                onChange={handleTemplateChange}
              >
                <Option value="tutorial" label="Completed Tutorial">
                  <FileTextOutlined /> Completed Tutorial
                </Option>
                <Option value="skill" label="New Skill Learned">
                  <ToolOutlined /> New Skill Learned
                </Option>
                <Option value="project" label="Built a Project">
                  <RocketOutlined /> Built a Project
                </Option>
              </Select>
            </Form.Item>
          )}

          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input placeholder="e.g., Completed Mern Codecamp" />
          </Form.Item>

          <Form.Item
            name="content"
            label="Details"
            rules={[{ required: true, message: "Please enter details" }]}
          >
            <Input.TextArea rows={4} placeholder="What did you learn or complete?" />
          </Form.Item>

          <Form.Item
            name="milestone"
            label="Milestone Level"
            rules={[{ required: true, message: "Please select a milestone level" }]}
          >
            <Select placeholder="Select milestone level">
              <Option value="Beginner">Beginner</Option>
              <Option value="Intermediate">Intermediate</Option>
              <Option value="Advanced">Advanced</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="duration"
            label="Duration"
            rules={[{ required: true, message: "Please select duration" }]}
          >
            <RangePicker 
              style={{ width: '100%' }}
              format="YYYY-MM-DD"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LearningProgress;
