import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { WizardContext } from '../WizardContext';
import { COLORS } from '../values/colors';
import img1 from '../images/midgate_mudball.png';
import img2 from '../images/shade_shore_sugarworms.png';
import img3 from '../images/skywrath_squawksicles.png';
import img4 from '../images/goldlake_glitterfish.png';
import img5 from '../images/oglodi_trail_jerky.png';
import bfs from '../bfs.js';

const StepFive = () => {
    const navigate = useNavigate();
    const menuRef = useRef(null);
    const contextOutput = useContext(WizardContext);
    let recipes = contextOutput.recipes;
    let startingCandies = contextOutput.startingCandies;
    let targetCandies = contextOutput.targetCandies;
    let inventoryLimit = contextOutput.inventoryLimit;
    const [bfsResult, setBfsResult] = useState({ found: false, allPaths: [], maxPath: [] });


    // for (let i = 0; i < recipes.length; i++) {
    //     console.log(recipes)
    //     recipes[i] = recipes[i]
    // }


    const candies = [
        { id: 1, image: img1, name: "Midgate Mudball" },
        { id: 2, image: img2, name: "Shade Shore Sugarworms" },
        { id: 3, image: img3, name: "Skywrath Squawksicles" },
        { id: 4, image: img4, name: "Goldlake Glitterfish" },
        { id: 5, image: img5, name: "Oglodi Trail Jerky" },
    ];
    const simpleExchange = {
        "B, B, B": ["P", "Y", "O", "R"],
        "P, P, P": ["B", "Y", "O", "R"],
        "Y, Y, Y": ["B", "P", "O", "R"],
        "O, O, O": ["B", "P", "Y", "R"],
        "R, R, R": ["B", "P", "Y", "O"],
    };

    const submitForm = () => {

        console.log("Starting Candy", startingCandies)
        console.log("Target Candies", targetCandies)
        console.log("Inventory Limit"< inventoryLimit)
        console.log("Recipe", recipes)



        let [found, allPaths, maxPath] = bfs(startingCandies, recipes, simpleExchange, targetCandies, inventoryLimit, 5);
        setBfsResult({ found, allPaths, maxPath });
    };

    const goToPrevious = () => {
        navigate('/step4');
    };

    return (
        <div className="wizard-main-box">
            <div className="the-crownfall-container">
                <p style={{ color: COLORS.red, fontSize: 24 }} className="the-crownfall">— The Crownfall —</p>
                <p style={{ fontSize: 56 }} className="candyworks-calculator">Candyworks Calculator</p>
            </div>

            <div className="frame-parent">
                <div className="step-label">
                    <div style={{ color: COLORS.red, fontSize: 16 }} className="the-crownfall-container">Results</div>
                    <div style={{ fontSize: 32 }} className="what-candies-do"> Algorithm Output</div>
                </div>
                <div className="click-the-to-select-a-candy-parent">
                    <div style={{ color: COLORS.grey, fontSize: 14 }} className="info-text">
                        Click Submit and wait for the algorithm to load.
                    </div>

                </div>
                <div className="frame-wrapper">
                    <div className="selected-items-wrapper">

                        <div className="frame-container" ref={menuRef}>
                            <div className="results-display">
                                {bfsResult.found ? (
                                    <div>
                                        <h2>Results Found:</h2>
                                        <pre>{JSON.stringify(bfsResult.maxPath, null, 2)}</pre>
                                    </div>
                                ) : (
                                    <p>No paths found matching the criteria.</p>
                                )}
                            </div>

                        </div>
                    </div>
                </div>

                <div className="of-4-parent">
                    <div className="of-4">5 of 5</div>
                    <div className="previous-wrapper">
                        <button className="previous-button" onClick={goToPrevious}>Previous</button>
                    </div>
                    <div className="next-step-wrapper">
                        <button className="next-step-button" onClick={submitForm}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepFive;
