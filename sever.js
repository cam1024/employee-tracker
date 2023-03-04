const inquirer = require("inquirer");
const consoleTable = require("console.table");
const sql = require('./db/query_lib');
const Helper = require('./lib/choiceHelper');

// add department

const newDept = async () => {  

  const deptartment = await inquirer.prompt([
     {
       type: "input",
       name: "name",
       message: "What is the name of the Department",
       validate: (name) =>{
         if (name) {
           return true;
         } else {
           console.log(" Please Enter a Department Name!")
           return false;
         }
       },
    },
  ]);

  await sql.addDept(deptartment);

  chooseRequest();
}

// adds an employee

const newEmp = async () => {

  const roleArr = await Helper.roleChoices();

  const mgmtArr = await Helper.mgmtChoices();

  const emp = await inquirer.prompt([
      {
        type: "input",
        name: "first",
        message: "What is the Employees First Name?",
        validate: (first) =>{
          if (first && isNaN(first)) {
            return true;
          } else {
            console.log(" Please Enter a Name!")
            return false;
          }
        },
     },
     {
      type: "input",
      name: "last",
      message: "What is the Employees Last Name?",
      validate: (last) =>{
        if (last && isNaN(last)) {
          return true;
        } else {
          console.log(" Please Enter a Name!")
          return false;
        }
      },
    },
    {
      type: "list",
      name: 'role_id',
      message: "What is the Employees Role?",
      choices: roleArr,
      loop: false,
    },
    {
      type: "list",
      name: 'manager_id',
      message: "Who is the Employees Manager?",
      choices: mgmtArr,
      loop: false,
    }
   ]);

  await sql.addEmp(emp);

  chooseRequest();  
 
}

// Adds a role

const newRole = async () => {

  const choicesArr = await Helper.deptChoices();

  const role = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "What is the name of the Role?",
        validate: (title) =>{
          if (title) {
            return true;
          } else {
            console.log(" Please Enter a Role Name!")
            return false;
          }
        },
     },
     {
       type: "input",
       name: 'salary',
       message: "What is the Salary of the Role?",
       validate: (salary) =>{
         if(salary && !isNaN(salary)){
           return true;
         } else {
           console.log(" Please Enter a Role Salary");
         }
       }
     },
     {
      type: "list",
      name: 'department_id',
      message: "What Department is the Role associated with?",
      choices: choicesArr,
      loop: false,
    }
   ]);

  await sql.addRole(role);

  chooseRequest();  
 
}

// Delete and Employee

const delEmp = async () => {
  const empArr = await Helper.NonMgmtChoices();

  const emp = await inquirer.prompt([
    {
      type: "list",
      name: "emp_id",
      message: "What Employee do you want to Delete?",
      choices: empArr,
      loop: false,
    }
   ]);

  await sql.deleteEmp(emp);

  chooseRequest();

}

// Update an employees role in company

const updateEmpRole = async () => {

  const roleArr = await Helper.roleChoices();

  const empArr = await Helper.empChoices();

  const emp = await inquirer.prompt([
    {
      type: "list",
      name: "emp_id",
      message: "What is the Employee do you want to update?",
      choices: empArr,
      loop: false,
    },
    {
      type: "list",
      name: 'role_id',
      message: "What is the Employees Role?",
      choices: roleArr,
      loop: false,
    }
   ]);

  await sql.updateEmpRoleById(emp);

  chooseRequest();  
 
}

// Updates an employees Manager

const updateEmpManager = async () => {

  const empArr = await Helper.NonMgmtChoices();

  const mgmtArr = await Helper.mgmtChoices();

  const emp = await inquirer.prompt([
    {
      type: "list",
      name: "emp_id",
      message: "What is the Employee do you want to update?",
      choices: empArr,
      loop: false,
    },
    {
      type: "list",
      name: 'manager_id',
      message: "Who is the Employees Manager?",
      choices: mgmtArr,
      loop: false,
    }
   ]);

  await sql.updateEmpManagerById(emp);

  chooseRequest();  
 
}

// View all departments in company

const viewDepts = () => {
  sql.getDepts()

  .then(([rows]) => {
    console.log('\n');
    console.log(consoleTable.getTable(rows));
  })

  .then(()=> {
      chooseRequest();
  }) 
}

// View all roles

const viewRoles = () => {
  sql.getRoles()

  .then(([rows]) => {
    console.log('\n');
    console.log(consoleTable.getTable(rows));
  })

  .then(()=> {
      chooseRequest();
  }) 
}
// View all employees

const viewEmps = () => {
  sql.getEmps()

  .then(([rows]) => {
    console.log('\n');
    console.log(consoleTable.getTable(rows));
  })

  .then(()=> {
      chooseRequest();
  }) 
}

// View All Departments and their Budget 

const viewBudgets = async () => {

  sql.getBudgetByDept()

  .then(([rows]) => {
    console.log('\n');
    console.log(consoleTable.getTable(rows));
  })

  .then(()=> {
      chooseRequest();
  }) 
}

// View all Employees in a specific Department

const viewEmpByDept = async () => {

  const deptArr = await Helper.deptChoices();

  inquirer.prompt([
    {
      type: "list",
      name: "dept_id",
      message: "What is the Department do you want to view Employees for?",
      choices: deptArr,
      loop: false
    }
   ])

  .then((data) => {
    sql.getEmpByDeptId(data)
      .then(([rows]) =>{
        console.log('\n');
        console.log(consoleTable.getTable(rows))
        chooseRequest();
      })
  }) 

}

// View all Employees who report to a specific Manager

const viewEmpByMgr = async () => {

  const mgmtArr = await Helper.mgmtChoices();

  inquirer.prompt([
    {
      type: "list",
      name: "manager_id",
      message: "Which Manager do you want to view Employees for?",
      choices: mgmtArr,
      loop: false
    }
   ])

  .then((data) => {
    sql.getEmpByMgrId(data)
      .then(([rows]) =>{
        console.log('\n');
        console.log(consoleTable.getTable(rows))
        chooseRequest();
      })
  }) 

}


const chooseRequest = () => {
  inquirer.prompt([
      {
        type: 'list',
        name: 'request',
        message: 'What would you like to do?',
        choices: ['Add a Department', 
                  'Add an Employee', 
                  'Add a Role',
                  'Delete an Employee',  
                  'Update Employees Role',
                  'Update Employees Manager',   
                  'View All Departments', 
                  'View All Employees', 
                  'View All Roles', 
                  'View Department Budget',  
                  'View Employees by Department',  
                  'View Employees by Manager'  
                 ],
        loop: false,
      },
  ])

  .then((data) => {
      const {request} = data;
      console.log(request);

    //   Switch case

    switch (request) {
        case 'Add a Department':
          newDept();
          break;
        case 'Add a Role':
          newRole();
          break;
        case 'Add an Employee':
          newEmp();
          break;
        case 'Delete an Employee':
          delEmp();
          break;
        case 'Update Employees Role':
          updateEmpRole();
          break;
        case 'Update Employees Manager':
          updateEmpManager();
          break;
        case 'View All Departments':
          viewDepts();
          break;
        case 'View All Employees':
          viewEmps();
          break;
        case 'View All Roles':
          viewRoles();
          break;         
        case 'View Department Budget':
          viewBudgets();
          break;
        case 'View Employees by Department':
          viewEmpByDept();
          break;
        case 'View Employees by Manager':
          viewEmpByMgr();
          break;                
    
        default:
            break;
    }
  })
}

chooseRequest();