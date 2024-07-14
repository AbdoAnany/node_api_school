const bcrypt = require('bcryptjs');
const db = require('./config/db');

const addFirstUserWithInfo = async () => {
    const username = 'admin56';
    const password = 'password123';
    const userDetails = {
        first_name: 'Admin',
        last_name: 'User',
        email: 'admin@example.com',
        phone: '1234567890',
        address: '123 Admin St, Admin City, Admin State',
        national_id: 'A12345678',
        gender: 'male',
        roles: 'admin',
        state: 'active'
    };

    try {
        // Check if the username already exists
        const [existingUsers] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
        if (existingUsers.length > 0) {
            console.log('Username already exists. Choose a different username.');
            process.exit(1);
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert into users table
        const [result] = await db.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
        const userId = result.insertId;

        // Insert into user_details table
        await db.execute(
            'INSERT INTO user_details (user_id, first_name, last_name, email, phone, address, national_id, gender, roles, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                userId,
                userDetails.first_name,
                userDetails.last_name,
                userDetails.email,
                userDetails.phone,
                userDetails.address,
                userDetails.national_id,
                userDetails.gender,
                userDetails.roles,
                userDetails.state
            ].map(val => (val !== undefined ? val : null)) // Replace undefined with null
        );

        console.log('First user and personal info added successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error adding first user with personal info:', error.message);
        process.exit(1);
    }
};
const addhInfo = async () => {
    const username = 'admin44';
    const password = 'password123';
    const userDetails = {
        first_name: 'Ali',
        last_name: 'Omar',
        email: 'Ali@example.com',
        phone: '01115485741544',
        address: '123 Ali St, Admin City, Admin State',
        national_id: 'A12345678',
        gender: 'male',
        roles: 'student',
        state: 'not active'
    };

    try {
        // Check if the username already exists
        const [existingUsers] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
        if (existingUsers.length > 0) {
            console.log('Username already exists. ');
            console.log(existingUsers.length);
            console.log(existingUsers[0]['id']);

            const userId = existingUsers[0]['id'];

            const [existingUsersD] = await db.execute('SELECT * FROM user_details WHERE user_id = ?', [userId]);
            if (existingUsersD.length == 0) {
            await db.execute(
                'INSERT INTO user_details (user_id, first_name, last_name, email, phone, address, national_id, gender, roles, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    userId,
                    userDetails.first_name,
                    userDetails.last_name,
                    userDetails.email,
                    userDetails.phone,
                    userDetails.address,
                    userDetails.national_id,
                    userDetails.gender,
                    userDetails.roles,
                    userDetails.state
                ].map(val => (val !== undefined ? val : null)) // Replace undefined with null
            );
        } else if (existingUsersD.length > 0) {
        
                await db.execute('UPDATE user_details SET first_name = ?, last_name = ?, email = ?, phone = ?, address = ?, national_id = ?, gender = ?, roles = ?, state = ? WHERE user_id = ?', 
                    [  userDetails.first_name,  userDetails.last_name,   userDetails.email,  
                         userDetails.phone,   userDetails.address,   userDetails.national_id,   userDetails.gender,  userDetails.roles,   userDetails.state, userId]
                    .map(val => 
                        (val !== undefined ? val : null)) // Replace undefined with null
            );
        }
    
            console.log('First user and personal info added successfully!');
            process.exit(0);
         
        }
   
    } catch (error) {
        console.error('Error adding first user with personal info:', error.message);
        process.exit(1);
    }
};
const getAllUser = async () => {
 
    try {
        // Check if the username already exists
        const [existingUsers] = await db.execute('SELECT * FROM user_details', );
        console.log(existingUsers.length);

        console.log('First user and personal info added successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error adding :', error.message);
        process.exit(1);
    }
};
addhInfo();