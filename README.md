# Ctrl+She

> presenting in steelhacksXII

This project is an interactive website that highlights <mark>women's representation</mark> in <mark>the technology field</mark> using data visualizations, user input, and team-based storytelling.

It was built to <mark>showcase official NSF statistics</mark> while also giving visitors a chance to <mark>share their own coding experiences and goals</mark>.

## 3 main sections for the website
- Home page: introduces the overall mission of making women in CS momre visible
- About page: introduces the team members and their individual motivations for choosing computer science
- Graphs page: contains several interactive visualizations and Gemini API features

### Graphs and Comparisons
> The site includes multiple graphs that allow comparisons and deeper insights

#### Founds and Grants
- The **scatter plot** displays relationships between *total* and *Research & Related Activities (R&RA)*'s budget request and appropriations

- The comparative bar graph shows the comparison between **female and male in STEM** in the field of *research grants*

#### Salary Comparison
- The **scatter plot** shows the *median salary for Computer & Information Sciences* by sex

- The **vertical bars** are the *standard errors (SE) reported in Table 60*. They each vary by 4000. Together, these graphs help viewes see both the specific situation of computer science and the wider trens across fields

### GeminiAI Embedding

Beyond the graphs, the project integrates the Gemini API to make the site interactive and personalized. 

Visitors can share their own background in coding, **indicate what they would like to learn**, and could even **test code snippets to receive automated responses**! 
This connects real users' experiences with the statistical story of women in computing reinforcing the project's message that data and personal journeys go hand in hand.


### Technology stack
- Front-End:
  - HTML, CSS, JavaScript, Figma
- Back-End:
  - data visualization: Plotly.js
  - interactive feature: Genimi API
- Data:
  - NSF Budget, awards, salary
- Server:
  - VS Code, VS Code Live Server extension, RStudio


## The Team
> Our team consists of four people

| Name  | Year | role    | position details| contact us |
| :---- | :-: | :-------: | :--------: |:---------------:|
| Angelina | sophomore  |UI / Front-End|- Front-End implemented front-end structure to JavaScript and HTML to optimize user interface <br> - link GeminiAI API to the user interface| ANR463@pitt.edu|
| Nicky   | sophomore  | Data collection & cleaning / Back-End | - collecting public sets, cleaning/joining CSVs <br> - developing with R and Python, the former for data analysis and the latter for training machine to do data predictions |NIC216@pitt.edu|
| Michelle | freshman  | UI / Front-End  | - logo design <br> - implemented front-end structure to CSS and HTML to optimize user interface |MES722@pitt.edu|
| Katie | sophomore  | Data collection & cleaning / Back-End  | - collecting public sets, cleaning/joining CSVs <br> - developing with R to analyze data into readable graphs |KAE129@pitt.edu|
