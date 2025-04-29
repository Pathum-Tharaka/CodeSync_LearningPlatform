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
