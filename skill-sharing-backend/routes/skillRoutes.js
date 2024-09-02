const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../authMiddleware');
const pool = require('../config/database');
const router = express.Router();

const User = require('..//..//models/User');
const Skills = require('..//..//models/Skills');

