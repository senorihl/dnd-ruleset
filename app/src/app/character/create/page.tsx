'use client';

import {GoArrowRight, GoArrowLeft} from "react-icons/go";
import Link from "next/link";

import {Classes, Class, Races, Race, Backgrounds, Background, Utils} from 'dnd-ruleset';
import React from "react";

const chooseButtonClass = 'cursor-pointer text-gray-800 font-bold inline-flex items-center';

type SelectionState = Partial<{
    class: Class,
    race: Race,
    background: Background,
}>

const selectionReducer = (state: SelectionState, action: { type: string; payload: any }): SelectionState => {
    if (action.type === 'class') {
        return {...state, class: action.payload};
    }
    throw Error('Unknown action.');
}

export default function Page() {
    const carouselHolder = React.createRef<HTMLDivElement>();
    const [currentStep, setStep] = React.useState(1);
    const [selectionState, dispatchSelection] = React.useReducer(selectionReducer, {});

    React.useEffect(() => {
        if (carouselHolder.current) {
            const carouselCard = carouselHolder.current.children.item(currentStep -1);
            if (carouselCard) {
                const {height, width} = carouselCard.getBoundingClientRect();
                carouselHolder.current.style.minHeight = height + 'px';
                carouselHolder.current.style.minWidth = width + 'px';
            }
        }
    }, [carouselHolder])

    const getTranslationClass = React.useCallback((step: number) => {
        let classes = 'absolute flex flex-col items-center gap-1 p-7 justify-evenly self-auto min-h-96 transition-all ';
        if (step < currentStep) {
            classes += 'right-full';
        } else if (step > currentStep) {
            classes += 'left-full';
        }
        return classes
    }, [currentStep]);

    const goToNextStep = React.useCallback(() => {
        setStep((currentStep) => currentStep + 1);
    }, [setStep]);

    return <div className={'p-4 sm:mb-4 sm:p-8 w-screen h-screen flex flex-row sm:items-center justify-center overflow-y-scroll'}>
        <div className={'flex flex-col'}>
            {currentStep === 1 ? (
                <Link href={'/'} className={'font-bold text-gray-600 hover:text-gray-800 inline-flex items-center w-70 mb-4 cursor-pointer '}>
                    <GoArrowLeft size={'1em'} className={'me-2'} /> Retour
                </Link>
            ) : (
                <button onClick={() => setStep((currentStep) => currentStep - 1)} className={'font-bold text-gray-600 hover:text-gray-800 inline-flex items-center w-70 mb-4 cursor-pointer '}>
                    <GoArrowLeft size={'1em'} className={'me-2'} /> Retour
                </button>
            )}
            <div className="relative mb-4 overflow-y-hidden overflow-x-hidden rounded-2xl shadow-2xl border border-gray-300 w-70 min-h-96 transition-all " ref={carouselHolder}>
                <div className={'w-70 ' + getTranslationClass(1)}>
                    <p className={'mb-2 font-bold text-gray-600'}>Choose your class:</p>
                    {Object.values(Classes).map(cClass => {
                        return <button key={`class[${cClass.name}]`} onClick={() => {
                            dispatchSelection({type: 'class', payload: cClass});
                            goToNextStep();
                        }} className={chooseButtonClass}>
                            {cClass.name} <GoArrowRight className={'ms-2'} />
                        </button>
                    })}
                </div>
                <div className={'overflow-y-scroll w-140 max-w-[calc(100vw-var(--spacing)*10)] ' + getTranslationClass(2)}>
                    {selectionState.class && (
                        <>
                            <p className={'mb-2 font-bold text-gray-600'}>{selectionState.class.name}</p>
                            <p className={'self-start'}>{selectionState.class.description}</p>
                            <p className={'mb-2 font-bold text-gray-600'}>Hit points</p>
                            <p className={'self-start'}>Hit dice: {selectionState.class.hitDice}</p>
                            <p className={'self-start'}>Hit points at level 1: {Utils.getMaxDiceResult(selectionState.class.hitDice)} + Constitution modifier</p>
                            <p className={'self-start'}>Hit points per later level: {selectionState.class.hitDice} (or {Math.floor(Utils.getMaxDiceResult(selectionState.class.hitDice) / 2) + 1}) + Constitution modifier</p>
                            <p className={'mb-2 font-bold text-gray-600'}>Proficiencies</p>
                            <p className={'self-start'}>Saving throws: {(selectionState.class.proficiencies.savingThrows || []).join(', ') || 'None'}</p>
                            <p className={'self-start'}>Skills (choose {selectionState.class.proficiencies.skillsChoose}): {selectionState.class.proficiencies.skills.join(', ')}</p>
                            <p className={'self-start'}>Weapons: {(selectionState.class.proficiencies.weapons || []).join(', ') || 'None'}</p>
                            <p className={'self-start'}>Tools: {(selectionState.class.proficiencies.tools || []).join(', ') || 'None'}</p>
                            <p className={'mb-2 font-bold text-gray-600'}>Armor training</p>
                            <p className={'self-start'}>{(selectionState.class.armors).join(', ') || 'None'}</p>
                            <p className={'mb-2 font-bold text-gray-600'}>Starting equipment</p>
                            <p className={'self-start'}>You can choose to start with:</p>
                            <ul className={'self-start list-disc ps-7'}>
                                {selectionState.class.startingEquipment.map(e => (<li key={`startingEquipment[${e}]`}>{e}</li>))}
                            </ul>
                            {selectionState.class.startingEquipmentAlt && selectionState.class.startingEquipment.length > 0 && (
                                <>
                                    <p className={'self-start'}>Or with:</p>
                                    <ul className={'self-start list-disc ps-7'}>
                                        {selectionState.class.startingEquipmentAlt.map(e => (<li key={`startingEquipmenAltt[${e}]`}>{e}</li>))}
                                    </ul>
                                </>
                            )}
                            <p className={'self-start'}>Or buy equipment with {selectionState.class.startingGold} GP</p>
                            <button onClick={goToNextStep} className={chooseButtonClass}>
                                Use {selectionState.class.name} <GoArrowRight className={'ms-2'} />
                            </button>
                        </>
                    )}
                </div>
                <div className={'w-70 ' + getTranslationClass(3)}>
                    <p className={'mb-2 font-bold text-gray-600'}>Choose your background:</p>
                    {Object.values(Backgrounds).map(background => {
                        return <button key={`background[${background.name}]`} onClick={goToNextStep} className={chooseButtonClass}>
                            {background.name} <GoArrowRight className={'ms-2'} />
                        </button>
                    })}
                </div>
                <div className={'w-70 ' + getTranslationClass(4)}>
                    <p className={'mb-2 font-bold text-gray-600'}>Choose your background:</p>
                    {Object.values(Backgrounds).map(background => {
                        return <button key={`background[${background.name}]`} onClick={goToNextStep} className={chooseButtonClass}>
                            {background.name} <GoArrowRight className={'ms-2'} />
                        </button>
                    })}
                </div>
                <div className={'w-70 ' + getTranslationClass(5)}>
                    <p className={'mb-2 font-bold text-gray-600'}>Choose your race:</p>
                    {Object.values(Races).map(race => {
                        return <button key={`class[${race.name}]`} onClick={goToNextStep} className={chooseButtonClass}>
                            {race.name} <GoArrowRight className={'ms-2'} />
                        </button>
                    })}
                </div>
                <div className={'w-70 ' + getTranslationClass(6)}>
                    <p className={'mb-2 font-bold text-gray-600'}>Choose your race:</p>
                    {Object.values(Races).map(race => {
                        return <button key={`class[${race.name}]`} onClick={goToNextStep} className={chooseButtonClass}>
                            {race.name} <GoArrowRight className={'ms-2'} />
                        </button>
                    })}
                </div>
            </div>
        </div>
    </div>
}