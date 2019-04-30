Python Plus Plus

Language - JavaScript (Node.js)

Business requirements
- Add support for ++ and -- operators in Python
- Use Node to parse through each Python module
- Replace x++ with x += 1
- Replace x-- with x -= 1
- Only concerned about post increment/decrement operators

Call Flow
- As a user, you will write normal Python code inside normal python modules (files ending with .py)
- Then run $ pypp python_project
	- This will parse through each python module in python_project and make the correction of ++ and -- to += 1 and -= 1
- Then normally call python to run the python_project
