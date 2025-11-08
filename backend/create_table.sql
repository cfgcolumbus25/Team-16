CREATE TABLE Institutions (
    uni_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,   
    state VARCHAR(2) NOT NULL,   
    cost VARCHAR(20) NOT NULL,
    acceptance_rate VARCHAR(10) NOT NULL
);

CREATE TABLE Clep_Exams (
    clep_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clep_exam_name TEXT NOT NULL
);

CREATE TABLE Clep_Policies (
    uni_clep_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_names TEXT NOT NULL,
    course_cutoff_score INT,
    course_credits INT,
    last_updated TIMESTAMP DEFAULT NOW(),
    num_updated INT DEFAULT 1,
    uni_id UUID REFERENCES universities(uni_id) NOT NULL,
    clep_id UUID REFERENCES ClepExam(clep_id) NOT NULL
);

CREATE TABLE Reviews (
    review_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    uni_clep_id UUID REFRENCES Clep_policies(uni_clep_id) NOT NULL,
    good_experience BOOLEAN NOT NULL,
    submitted_at TIMESTAMP DEFAULT NOW()
)