    function showForm(formType) {
        const forms = {
            elementary: `
                <form id="elementary-form" class="active" onsubmit="handleInitialSubmit(event, 'elementary')">
                    <label for="given-name">Given Name:</label>
                    <input type="text" id="given-name" name="given_name">
                    <label for="middle-name">Middle Name:</label>
                    <input type="text" id="middle-name" name="middle_name">
                    <label for="last-name">Last Name:</label>
                    <input type="text" id="last-name" name="last_name">
                    <label for="mother-name">Mother's Name:</label>
                    <input type="text" id="mother-name" name="mother_name">
                    <label for="mother-occupation">Mother's Occupation:</label>
                    <input type="text" id="mother-occupation" name="mother_occupation">
                    <label for="contact-number">Contact Number:</label>
                    <input type="text" id="contact-number" name="contact_number">
                    <label for="guardian">Guardian:</label>
                    <input type="text" id="guardian" name="guardian">
                    <label for="address">Address:</label>
                    <textarea id="address" name="address"></textarea>
                    <button type="submit">Submit</button>
                </form>
            `,
            junior: `
                <form id="junior-form" class="active" onsubmit="handleInitialSubmit(event, 'junior')">
                    <label for="given-name">Given Name:</label>
                    <input type="text" id="given-name" name="given_name">
                    <label for="middle-name">Middle Name:</label>
                    <input type="text" id="middle-name" name="middle_name">
                    <label for="last-name">Last Name:</label>
                    <input type="text" id="last-name" name="last_name">
                    <label for="previous-school">Previous School:</label>
                    <input type="text" id="previous-school" name="previous_school">
                    <label for="mother-name">Mother's Name:</label>
                    <input type="text" id="mother-name" name="mother_name">
                    <label for="mother-occupation">Mother's Occupation:</label>
                    <input type="text" id="mother-occupation" name="mother_occupation">
                    <label for="contact-number">Contact Number:</label>
                    <input type="text" id="contact-number" name="contact_number">
                    <label for="guardian">Guardian:</label>
                    <input type="text" id="guardian" name="guardian">
                    <label for="address">Address:</label>
                    <textarea id="address" name="address"></textarea>
                    <button type="submit">Submit</button>
                </form>
            `,
            senior: `
                <form id="senior-form" class="active" onsubmit="handleInitialSubmit(event, 'senior')">
                    <label for="given-name">Given Name:</label>
                    <input type="text" id="given-name" name="given_name">
                    <label for="middle-name">Middle Name:</label>
                    <input type="text" id="middle-name" name="middle_name">
                    <label for="last-name">Last Name:</label>
                    <input type="text" id="last-name" name="last_name">
                    <label for="mother-name">Mother's Name:</label>
                    <input type="text" id="mother-name" name="mother_name">
                    <label for="mother-occupation">Mother's Occupation:</label>
                    <input type="text" id="mother-occupation" name="mother_occupation">
                    <label for="contact-number">Contact Number:</label>
                    <input type="text" id="contact-number" name="contact_number">
                    <label for="guardian">Guardian:</label>
                    <input type="text" id="guardian" name="guardian">
                    <label for="address">Address:</label>
                    <textarea id="address" name="address"></textarea>
                    <label for="strand">Strand:</label>
                    <select id="strand" name="strand">
                        <option value="" disabled selected>Choose your Strand</option>
                        <option value="abm">ABM (Accountancy, Business and Management)</option>
                        <option value="humms">HUMMS (Humanities and Social Science)</option>
                        <option value="stem">STEM (Science, Technology, Engineering and Mathematics)</option>
                    </select>
                    <button type="submit">Submit</button>
                </form>
            `,
            higher: `
                <form id="higher-form" class="active" onsubmit="handleInitialSubmit(event, 'higher')">
                    <label for="applicant-type">Applicant Type:</label>
                    <select id="applicant-type" name="applicant_type" onchange="showCourses()">
                        <option value="" disabled selected>Choose your applicant type</option>
                        <option value="freshman-undergraduate">Freshman Undergraduate</option>
                        <option value="freshman-graduate">Freshman Graduate Studies</option>
                        <option value="transferee-undergraduate">Transferee Undergraduate</option>
                        <option value="transferee-graduate">Transferee Graduate Studies</option>
                    </select>
                    <label for="given-name">Given Name:</label>
                    <input type="text" id="given-name" name="given_name">
                    <label for="middle-name">Middle Name:</label>
                    <input type="text" id="middle-name" name="middle_name">
                    <label for="last-name">Last Name:</label>
                    <input type="text" id="last-name" name="last_name">
                    <label for="school">School:</label>
                    <input type="text" id="school" name="school">
                    <label for="email">Email Address:</label>
                    <input type="email" id="email" name="email">
                    
                    <label for="contact-number">Contact Number:</label>
                    <input type="text" id="contact-number" name="contact_number">
                    <label for="address">Address:</label>
                    <textarea id="address" name="address"></textarea>
                    <label for="course">Course:</label>
                    <select id="course" name="course">
                        <option value="" disabled selected>Select a course</option>
                    </select>
                    <button type="submit">Submit</button>
                </form>
            `
        };

        document.getElementById('form-container').innerHTML = forms[formType];
        updateButtonSelection(formType);
    }

    async function handleInitialSubmit(event, formType) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const data = { admission_type: formType };
        formData.forEach((value, key) => {
            data[key] = value;
        });

        const username = generateUsername();
        const password = generatePassword();

        data.username = username;
        data.password = password;

        const { error } = await supabase.from('admissions').insert(data);

        if (error) {
            console.error('Error saving data:', error);
            return;
        }

        document.querySelector('.container').innerHTML = `
            <img src="catsu.png" alt="Catanduanes State University" class="school-image">
            <h1>Catanduanes State University</h1>
        
            <p>We appreciate your interest in applying with us.<br>
            Please save your username and password.</p>
            <p>Username: ${username}</p>
            <p>Password: ${password}</p>
            <button id="login-button" type="button">Login</button>
        `;

        document.getElementById('login-button').addEventListener('click', showLoginForm);
    }

    function generateUsername() {
        return 'user' + Math.floor(Math.random() * 10000);
    }

    function generatePassword() {
        return Math.random().toString(36).slice(-8);
    }

    // function showLoginForm(event) {
    //     event.preventDefault();
    //     document.querySelector('.container').innerHTML = `
    //         <img src="catsu.png" alt="Catanduanes State University" class="school-image">
    //         <h1>Catanduanes State University</h1>
    //         <h2>Online Admission System</h2>
    //         <label class="text-left" for="username">Username:</label>
    //         <input type="text" id="username" name="username">
    //         <label class="text-left" for="password">Password:</label>
    //         <input type="password" id="password" name="password">
    //         <button id="dashboard-go" type="submit">Login</button>
    //     `;

    //     document.getElementById('dashboard-go').addEventListener('click', async function () {
    //         const username = document.getElementById('username').value;
    //         const password = document.getElementById('password').value;

    //         const { data, error } = await supabase
    //             .from('admissions')
    //             .select('*')
    //             .eq('username', username)
    //             .eq('password', password)
    //             .single();

    //         if (error) {
    //             alert('Login failed. Please check your credentials and try again.');
    //             return;
    //         }

    //         window.location.href = 'dashboard.html';
    //     });
    // }

    function showLoginForm(event) {
        event?.preventDefault();
        document.querySelector('.container').innerHTML = `
            <img src="catsu.png" alt="Catanduanes State University" class="school-image">
            <h1>Catanduanes State University</h1>
            <h2>Online Admission System</h2>
            <label class="text-left" for="username">Username:</label>
            <input type="text" id="username" name="username">
            <label class="text-left" for="password">Password:</label>
            <input type="password" id="password" name="password">
            <button id="dashboard-go" type="submit">Login</button>
        `;
    
        document.getElementById('dashboard-go').addEventListener('click', async function () {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
    
            const { data, error } = await supabase
                .from('admissions')
                .select('*')
                .eq('username', username)
                .eq('password', password)
                .single();
    
            if (error) {
                alert('Login failed. Please check your credentials and try again.');
                return;
            }
    
            localStorage.setItem('userData', JSON.stringify(data));
            window.location.href = 'dashboard.html';
        });
    }
    

    function updateButtonSelection(selectedType) {
        const buttons = document.querySelectorAll('.buttons button');
        buttons.forEach(button => {
            if (button.textContent.toLowerCase().includes(selectedType)) {
                button.classList.add('selected');
            } else {
                button.classList.remove('selected');
            }
        });
    }

    function showCourses() {
        const applicantType = document.getElementById('applicant-type').value;
        const courseSelect = document.getElementById('course');
        courseSelect.innerHTML = '';

        if (applicantType.includes('undergraduate')) {
            const undergradCourses = `
            <optgroup label="Undergraduate Courses">
            <!-- List of undergraduate courses -->
            <option value="bs-civil-eng">Bachelor of Science in Civil Engineering</option>
            <option value="bs-comp-eng">Bachelor of Science in Computer Engineering</option>
            <option value="bs-arch">Bachelor of Science in Architecture</option>
            <option value="bs-bio">Bachelor of Science in Biology</option>
            <option value="bs-env-sci">Bachelor of Science in Environmental Science</option>
            <option value="bs-math">Bachelor of Science in Mathematics</option>
            <option value="ba-pol-sci">Bachelor of Arts in Political Science</option>
            <option value="ba-econ">Bachelor of Arts in Economics</option>
            <option value="bpa">Bachelor of Public Administration</option>
            <option value="ba-eng-lang">Bachelor of Arts in English Language</option>
            <option value="bs-accountancy">Bachelor of Science in Accountancy</option>
            <option value="bs-ais">Bachelor of Science in Accounting Information System</option>
            <option value="bs-ba-fm">Bachelor of Science in Business Administration - Major in Financial Management</option>
            <option value="bs-ba-hrdm">Bachelor of Science in Business Administration - Major in Human Resource Development Management</option>
            <option value="bs-ba-marketing">Bachelor of Science in Business Administration - Major in Marketing Management</option>
            <option value="bs-entrepreneurship">Bachelor of Science in Entrepreneurship</option>
            <option value="bs-internal-auditing">Bachelor of Science in Internal Auditing</option>
            <option value="bs-office-admin">Bachelor of Science in Office Administration</option>
            <option value="bs-nursing">Bachelor of Science in Nursing</option>
            <option value="bs-nutrition-dietetics">Bachelor of Science in Nutrition and Dietetics</option>
            <option value="bs-industrial-tech-auto">Laddered Bachelor of Science in Industrial Technology - Major in Automotive</option>
            <option value="bs-industrial-tech-drafting">Laddered Bachelor of Science in Industrial Technology - Major in Drafting</option>
            <option value="bs-industrial-tech-electrical">Laddered Bachelor of Science in Industrial Technology - Major in Electrical</option>
            <option value="bs-industrial-tech-electronics">Laddered Bachelor of Science in Industrial Technology - Major in Electronics</option>
            <option value="bs-industrial-tech-food">Laddered Bachelor of Science in Industrial Technology - Major in Food and Service Management</option>
            <option value="bs-industrial-tech-garments">Laddered Bachelor of Science in Industrial Technology - Major in Garments, Fashion and Design</option>
            <option value="bs-industrial-tech-mechanical">Laddered Bachelor of Science in Industrial Technology - Major in Mechanical</option>
            <option value="bs-agriculture-animal">Bachelor of Science in Agriculture - Major in Animal Husbandry</option>
            <option value="bs-agriculture-crop">Bachelor of Science in Agriculture - Major in Crop Science</option>
            <option value="bs-agri-business">Bachelor of Science in Agri-Business</option>
            <option value="bs-fisheries">Bachelor of Science in Fisheries</option>
            <option value="cert-agri-sci">Certificate in Agricultural Science</option>
            <option value="bs-elem-edu">Bachelor of Elementary Education</option>
            <option value="bs-secondary-edu-eng">Bachelor of Science in Secondary Education - Major in English</option>
            <option value="bs-secondary-edu-fil">Bachelor of Science in Secondary Education - Major in Filipino</option>
            <option value="bs-secondary-edu-math">Bachelor of Science in Secondary Education - Major in Mathematics</option>
            <option value="bs-secondary-edu-bio">Bachelor of Science in Secondary Education - Major in Biological Science</option>
            <option value="bs-secondary-edu-soc">Bachelor of Science in Secondary Education - Major in Social Studies</option>
            <option value="bs-secondary-edu-mape">Bachelor of Science in Secondary Education - Major in Music, Arts and Physical Education</option>
            <option value="bs-tech-voc-te-electronics">Bachelor of Science in Technical-Vocational Teacher Education - Major in Electronics Technology</option>
            <option value="bs-tech-voc-te-food">Bachelor of Science in Technical-Vocational Teacher Education - Major in Food and Service Management</option>
            <option value="bs-culture-arts-edu">Bachelor of Science in Culture and Arts Education</option>
            <option value="bs-phys-edu">Bachelor of Science in Physical Education</option>
            <option value="bs-info-systems">Bachelor of Science in Information Systems</option>
            <option value="bs-info-tech">Bachelor of Science in Information Technology</option>
            <option value="bs-comp-sci">Bachelor of Science in Computer Science</option>
            <option value="bs-entertainment-multimedia-game">Bachelor of Science in Entertainment and Multimedia Computing - Major in Game Development</option>
            <option value="bs-entertainment-multimedia-digital">Bachelor of Science in Entertainment and Multimedia Computing - Major in Digital Animation</option>
            <option value="bs-library-info-sci">Bachelor of Science in Library in Information Science</option>
        </optgroup>
            `;
            courseSelect.innerHTML = undergradCourses;
        } else if (applicantType.includes('graduate')) {
            const gradCourses = `
            <optgroup label="Graduate School Courses">
            <!-- List of graduate courses -->
            <option value="phd-educ-management">Doctor of Philosophy in Educational Management</option>
            <option value="doctor-educ-management">Doctor of Education Major in Educational Management</option>
            <option value="ma-educ-management">Master of Arts in Educational Management</option>
            <option value="ma-filipino-edu">Master of Arts in Filipino Education</option>
            <option value="ma-math-edu">Master of Arts in Mathematics Education</option>
            <option value="ma-guidance-counseling">Master of Arts in Guidance and Counseling</option>
            <option value="ma-english">Master of Arts in English</option>
            <option value="ma-nursing">Master of Arts in Nursing</option>
            <option value="ma-teaching-bio">Master of Arts in Teaching Biology</option>
            <option value="ma-teaching-chem">Master of Arts in Teaching Chemistry</option>
            <option value="ma-teaching-physics">Master of Arts in Teaching Physics</option>
            <option value="ma-agricultural-edu">Master of Arts in Agricultural Education</option>
            <option value="mpa">Master of Public Administration</option>
            <option value="mba">Master in Business Administration</option>
            <option value="ma-industrial-edu">Master of Arts in Industrial Education</option>
            <option value="diploma-educ-management">Diploma in Educational Management</option>
            <option value="diploma-public-admin">Diploma in Public Administration</option>
        </optgroup>
            `;
            courseSelect.innerHTML = gradCourses;
        }
    }




    