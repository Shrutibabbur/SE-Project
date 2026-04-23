// ══════════════════════════════════════════════════════════
// AUTH
// ══════════════════════════════════════════════════════════
const USERS = {
  admin:  { pass:'admin123',   role:'admin',   name:'Admin User',    disp:'Administrator' },
  teacher:{ pass:'teach123',   role:'teacher', name:'Priya Iyer',    disp:'Class Teacher - 10A' },
  student:{ pass:'stu123',     role:'student', name:'Aarav Sharma',  disp:'Student — Class 10-A' },
};
let currentUser = null;
let selectedRole = 'admin';

function setRole(r, el) {
  selectedRole = r;
  document.querySelectorAll('.role-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const hints = { admin:'admin / admin123', teacher:'teacher / teach123', student:'student / stu123' };
  document.getElementById('login-user').value = r;
  document.getElementById('login-pass').value = r === 'admin' ? 'admin123' : r === 'teacher' ? 'teach123' : 'stu123';
}

function togglePw() {
  const i = document.getElementById('login-pass');
  i.type = i.type === 'password' ? 'text' : 'password';
}

function doLogin() {
  const u = document.getElementById('login-user').value.trim();
  const p = document.getElementById('login-pass').value;
  const err = document.getElementById('login-err');
  if (USERS[u] && USERS[u].pass === p) {
    currentUser = { username: u, ...USERS[u] };
    err.style.display = 'none';
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('app').classList.add('visible');
    initApp();
  } else {
    err.style.display = 'block';
    document.getElementById('login-pass').style.borderColor = 'var(--red)';
    setTimeout(() => document.getElementById('login-pass').style.borderColor = '', 2000);
  }
}

function logout() {
  showConfirm('Sign Out?', 'You will be returned to the login page.', '🔒', () => {
    currentUser = null;
    document.getElementById('app').classList.remove('visible');
    document.getElementById('login-page').style.display = 'flex';
    document.getElementById('login-pass').value = '';
  });
}

// ══════════════════════════════════════════════════════════
// DATA
// ══════════════════════════════════════════════════════════
const AVG_COLORS = ['#4f7cff','#8b5cf6','#22c55e','#f59e0b','#ef4444','#14b8a6','#ec4899','#f97316','#06b6d4','#84cc16'];
let students = [
  {id:1,fname:'Aarav',lname:'Sharma',email:'aarav.s@school.edu',phone:'+91 9876543210',class:'10-A',roll:'101',dob:'2009-03-14',gender:'Male',address:'12, MG Road, Solapur, MH',father:'Vikram Sharma',mother:'Sunita Sharma',guardian:'',pcontact:'+91 9876543210',pemail:'vikram@mail.com',blood:'B+',status:'Active',admit:'2022-06-01',feeCat:'Regular',annualFee:45000,paidFee:45000,lastPay:'2025-03-15',math:88,science:91,english:82,history:78,cs:85,attendance:92,medNotes:'None'},
  {id:2,fname:'Priya',lname:'Patil',email:'priya.p@school.edu',phone:'+91 9123456789',class:'10-A',roll:'102',dob:'2009-07-22',gender:'Female',address:'45, Station Road, Pune, MH',father:'Suresh Patil',mother:'Kavita Patil',guardian:'',pcontact:'+91 9123456789',pemail:'suresh@mail.com',blood:'A+',status:'Active',admit:'2022-06-01',feeCat:'Regular',annualFee:45000,paidFee:30000,lastPay:'2025-01-10',math:95,science:89,english:91,history:85,cs:93,attendance:88,medNotes:'None'},
  {id:3,fname:'Rahul',lname:'Desai',email:'rahul.d@school.edu',phone:'+91 9234567890',class:'10-B',roll:'103',dob:'2009-01-05',gender:'Male',address:'78, Civil Lines, Nashik, MH',father:'Anil Desai',mother:'Meena Desai',guardian:'',pcontact:'+91 9234567890',pemail:'anil@mail.com',blood:'O+',status:'At Risk',admit:'2022-06-01',feeCat:'Regular',annualFee:45000,paidFee:10000,lastPay:'2024-09-20',math:55,science:61,english:58,history:52,cs:48,attendance:64,medNotes:'Asthma - carry inhaler'},
  {id:4,fname:'Sneha',lname:'Kulkarni',email:'sneha.k@school.edu',phone:'+91 9345678901',class:'11-A',roll:'201',dob:'2008-11-18',gender:'Female',address:'23, Shivaji Nagar, Mumbai, MH',father:'Rajesh Kulkarni',mother:'Nandini Kulkarni',guardian:'',pcontact:'+91 9345678901',pemail:'rajesh@mail.com',blood:'AB+',status:'Active',admit:'2021-06-01',feeCat:'Regular',annualFee:50000,paidFee:50000,lastPay:'2025-02-28',math:92,science:88,english:96,history:90,cs:94,attendance:95,medNotes:'None'},
  {id:5,fname:'Arjun',lname:'Jadhav',email:'arjun.j@school.edu',phone:'+91 9456789012',class:'11-B',roll:'202',dob:'2008-04-30',gender:'Male',address:'56, Laxmi Nagar, Kolhapur, MH',father:'Mohan Jadhav',mother:'Rekha Jadhav',guardian:'',pcontact:'+91 9456789012',pemail:'mohan@mail.com',blood:'B-',status:'Active',admit:'2021-06-01',feeCat:'Regular',annualFee:50000,paidFee:25000,lastPay:'2024-12-01',math:74,science:70,english:65,history:72,cs:68,attendance:79,medNotes:'None'},
  {id:6,fname:'Kavya',lname:'Nair',email:'kavya.n@school.edu',phone:'+91 9567890123',class:'12-A',roll:'301',dob:'2007-08-09',gender:'Female',address:'89, Sadar, Nagpur, MH',father:'Krishnan Nair',mother:'Lakshmi Nair',guardian:'',pcontact:'+91 9567890123',pemail:'krishnan@mail.com',blood:'O-',status:'Active',admit:'2020-06-01',feeCat:'Scholarship',annualFee:20000,paidFee:20000,lastPay:'2025-04-01',math:84,science:87,english:89,history:82,cs:91,attendance:90,medNotes:'None'},
  {id:7,fname:'Rohit',lname:'Pawar',email:'rohit.pw@school.edu',phone:'+91 9678901234',class:'10-B',roll:'104',dob:'2009-02-28',gender:'Male',address:'34, Camp Area, Aurangabad, MH',father:'Santosh Pawar',mother:'Alka Pawar',guardian:'',pcontact:'+91 9678901234',pemail:'santosh@mail.com',blood:'A-',status:'Inactive',admit:'2022-06-01',feeCat:'Regular',annualFee:45000,paidFee:0,lastPay:'N/A',math:48,science:52,english:44,history:50,cs:42,attendance:45,medNotes:'Needs special attention'},
  {id:8,fname:'Anjali',lname:'Bhosale',email:'anjali.b@school.edu',phone:'+91 9789012345',class:'11-A',roll:'203',dob:'2008-06-14',gender:'Female',address:'67, Peth Road, Satara, MH',father:'Pramod Bhosale',mother:'Sujata Bhosale',guardian:'',pcontact:'+91 9789012345',pemail:'pramod@mail.com',blood:'B+',status:'Active',admit:'2021-06-01',feeCat:'Regular',annualFee:50000,paidFee:40000,lastPay:'2025-03-05',math:79,science:82,english:85,history:77,cs:80,attendance:84,medNotes:'None'},
  {id:9,fname:'Kiran',lname:'More',email:'kiran.m@school.edu',phone:'+91 9890123456',class:'12-A',roll:'302',dob:'2007-12-03',gender:'Male',address:'11, Ring Road, Solapur, MH',father:'Dattatray More',mother:'Sushila More',guardian:'',pcontact:'+91 9890123456',pemail:'dattatray@mail.com',blood:'O+',status:'Active',admit:'2020-06-01',feeCat:'Regular',annualFee:52000,paidFee:52000,lastPay:'2025-01-15',math:90,science:85,english:88,history:86,cs:89,attendance:91,medNotes:'None'},
  {id:10,fname:'Pooja',lname:'Shinde',email:'pooja.sh@school.edu',phone:'+91 9901234567',class:'10-B',roll:'105',dob:'2009-05-17',gender:'Female',address:'22, Model Colony, Pune, MH',father:'Ganesh Shinde',mother:'Meera Shinde',guardian:'',pcontact:'+91 9901234567',pemail:'ganesh@mail.com',blood:'AB-',status:'Active',admit:'2022-06-01',feeCat:'Regular',annualFee:45000,paidFee:22500,lastPay:'2025-02-10',math:83,science:76,english:80,history:74,cs:77,attendance:86,medNotes:'None'},
];
let nextId = 11;

const notices = [
  {id:1,title:'Annual Examination Schedule Released',cat:'Exam',date:'2025-04-15',desc:'Annual examinations will commence from May 5th. Full timetable is available on the school website and notice board. Students are advised to prepare accordingly.',target:'All',urgent:true},
  {id:2,title:'Summer Vacation Announcement',cat:'Holiday',date:'2025-04-10',desc:'School will remain closed from May 20 to June 15 for summer vacation. Classes resume on June 16th.',target:'All',urgent:false},
  {id:3,title:'Science Fair Registration Open',cat:'Event',date:'2025-04-08',desc:'Students from Classes 9–12 can register for the annual science fair by April 25. Registration forms available at the school office.',target:'Students',urgent:false},
];
let nextNoticeId = 4;

const feeHistory = [
  {date:'2025-04-01',student:'Kavya Nair',amount:20000,mode:'Online Transfer',receipt:'RCP-2025-101',by:'Admin'},
  {date:'2025-03-15',student:'Aarav Sharma',amount:22500,mode:'Cash',receipt:'RCP-2025-100',by:'Admin'},
  {date:'2025-03-05',student:'Anjali Bhosale',amount:10000,mode:'Cheque',receipt:'RCP-2025-099',by:'Admin'},
  {date:'2025-02-28',student:'Sneha Kulkarni',amount:25000,mode:'Online Transfer',receipt:'RCP-2025-098',by:'Admin'},
  {date:'2025-02-10',student:'Pooja Shinde',amount:22500,mode:'Cash',receipt:'RCP-2025-097',by:'Admin'},
];
let nextReceipt = 102;

const schedule = {
  '10-A': [
    [{sub:'Mathematics',teacher:'Mr. Verma',time:'8:00-8:45',color:'var(--blue)'},{sub:'Science',teacher:'Mrs. Joshi',time:'8:45-9:30',color:'var(--green)'},{sub:'English',teacher:'Ms. Rao',time:'9:45-10:30',color:'var(--purple)'},{sub:'History',teacher:'Mr. Singh',time:'10:30-11:15',color:'var(--amber)'}],
    [{sub:'English',teacher:'Ms. Rao',time:'8:00-8:45',color:'var(--purple)'},{sub:'CS',teacher:'Mr. Kumar',time:'8:45-9:30',color:'var(--teal)'},{sub:'Mathematics',teacher:'Mr. Verma',time:'9:45-10:30',color:'var(--blue)'},{sub:'Science Lab',teacher:'Mrs. Joshi',time:'10:30-12:00',color:'var(--green)'}],
    [{sub:'History',teacher:'Mr. Singh',time:'8:00-8:45',color:'var(--amber)'},{sub:'Mathematics',teacher:'Mr. Verma',time:'8:45-9:30',color:'var(--blue)'},{sub:'Sports',teacher:'Mr. Patil',time:'9:45-10:30',color:'var(--red)'},{sub:'English',teacher:'Ms. Rao',time:'10:30-11:15',color:'var(--purple)'}],
    [{sub:'Science',teacher:'Mrs. Joshi',time:'8:00-8:45',color:'var(--green)'},{sub:'CS Lab',teacher:'Mr. Kumar',time:'8:45-9:30',color:'var(--teal)'},{sub:'History',teacher:'Mr. Singh',time:'9:45-10:30',color:'var(--amber)'},{sub:'Mathematics',teacher:'Mr. Verma',time:'10:30-11:15',color:'var(--blue)'}],
    [{sub:'CS',teacher:'Mr. Kumar',time:'8:00-8:45',color:'var(--teal)'},{sub:'English',teacher:'Ms. Rao',time:'8:45-9:30',color:'var(--purple)'},{sub:'Science',teacher:'Mrs. Joshi',time:'9:45-10:30',color:'var(--green)'},{sub:'Math Test',teacher:'Mr. Verma',time:'10:30-11:15',color:'var(--red)'}],
    [{sub:'Sports',teacher:'Mr. Patil',time:'8:00-9:30',color:'var(--red)'},{sub:'Library',teacher:'Mrs. Das',time:'9:45-10:30',color:'var(--text3)'},{sub:'—',teacher:'',time:'',color:'var(--bg4)'},{sub:'—',teacher:'',time:'',color:'var(--bg4)'}],
  ]
};

// ══════════════════════════════════════════════════════════
// HELPERS (Continues in next message due to length)
// ══════════════════════════════════════════════════════════
