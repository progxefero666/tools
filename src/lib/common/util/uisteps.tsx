import React from 'react';

/**
 * 
 */
export default function UiSteps(props: { stepData: [number, number] }) {
    /*
props.stepData[0]
    */
    return (
      <div>
        <ul className="steps">
          <li className="step step-primary" />
          <li className="step" />
          <li className="step" />
        </ul>
      </div>
    );
  }