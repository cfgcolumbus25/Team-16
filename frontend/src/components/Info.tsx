import React from 'react';

const Info = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
      <h1 style={{ textAlign: 'center', color: '#4A90E2' }}>API Documentation</h1>
      <p style={{ textAlign: 'center', color: '#666' }}>
        This document provides a short, structured overview of the available API endpoints for CLEP exams, CLEP policies, institutions, and reviews.
      </p>

      <hr style={{ margin: '20px 0' }} />

      <section>
        <h2 style={{ color: '#4A90E2' }}>CLEP Exams Endpoints</h2>
        <p>Base URL: <code>/clep_exams</code></p>
        <ul>
          <li><strong>GET /clep_exams</strong>: Returns all CLEP exams.</li>
          <li><strong>POST /clep_exams</strong>: Creates a new CLEP exam. <em>Required Field:</em> <code>clep_exam_name</code></li>
          <li><strong>PUT /clep_exams</strong>: Updates an existing CLEP exam. <em>Required Field:</em> <code>clep_id</code></li>
          <li><strong>DELETE /clep_exams</strong>: Deletes a CLEP exam. <em>Required Field:</em> <code>clep_id</code></li>
        </ul>
      </section>

      <hr style={{ margin: '20px 0' }} />

      <section>
        <h2 style={{ color: '#4A90E2' }}>CLEP Policies Endpoints</h2>
        <p>Base URL: <code>/clep_policies</code></p>
        <ul>
          <li><strong>GET /clep_policies</strong>: Returns all CLEP policies.</li>
          <li><strong>POST /clep_policies</strong>: Creates a CLEP policy. <em>Required Fields:</em> <code>course_names</code>, <code>course_cutoff_score</code>, <code>course_credits</code>, <code>uni_id</code>, <code>clep_id</code></li>
          <li><strong>PUT /clep_policies/&lt;uuid&gt;</strong>: Updates a CLEP policy. Automatically updates <code>last_updated</code>.</li>
          <li><strong>DELETE /clep_policies/&lt;uuid&gt;</strong>: Deletes a CLEP policy.</li>
          <li><strong>POST /clep_policies/filter</strong>: Filters CLEP policies based on user location, CLEP exams taken, and in-state status. Returns matching universities with matched CLEP exams, score comparison, review data, and up-to-date status.</li>
        </ul>
      </section>

      <hr style={{ margin: '20px 0' }} />

      <section>
        <h2 style={{ color: '#4A90E2' }}>Institutions Endpoints</h2>
        <p>Base URL: <code>/institutions</code></p>
        <ul>
          <li><strong>GET /institutions</strong>: Returns a list of institutions ordered by name.</li>
          <li><strong>GET /institutions/policies/&lt;uni_id&gt;</strong>: Returns all CLEP-related course policies for a given institution.</li>
          <li><strong>GET /institutions_all</strong>: Returns institutions with nested CLEP exams and their policy details.</li>
          <li><strong>POST /institutions</strong>: Creates an institution. <em>Required Fields:</em> <code>name</code>, <code>cost</code>, <code>acceptance_rate</code>, <code>state</code></li>
          <li><strong>PUT /institutions/&lt;uni_id&gt;</strong>: Updates an institution. Only fields in the required set may be updated.</li>
          <li><strong>DELETE /institutions/&lt;uni_id&gt;</strong>: Deletes an institution.</li>
        </ul>
      </section>

      <hr style={{ margin: '20px 0' }} />

      <section>
        <h2 style={{ color: '#4A90E2' }}>Reviews Endpoints</h2>
        <p>Base URL: <code>/reviews</code></p>
        <ul>
          <li><strong>GET /reviews</strong>: Returns all reviews ordered by submission date.</li>
          <li><strong>POST /reviews</strong>: Creates a review. <em>Required Fields:</em> <code>uni_clep_id</code>, <code>good_experience</code></li>
          <li><strong>PUT /reviews/&lt;review_id&gt;</strong>: Updates a review.</li>
          <li><strong>DELETE /reviews/&lt;review_id&gt;</strong>: Deletes a review.</li>
        </ul>
      </section>
    </div>
  );
};

export default Info;