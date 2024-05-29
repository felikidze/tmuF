import {FC, useState} from 'react';
import {Card, Flex, Checkbox, Radio, RadioChangeEvent} from 'antd';

import {QUESTION_MODEL, ANSWER_TYPE} from '@models/Question';
import {IProviderProps} from '@context/Context';

interface IQuestionProps {
    question: QUESTION_MODEL;
}

const Question: FC<IQuestionProps & Pick<IProviderProps, 'onNewQuestion'>> = (props) => {
    const {onNewQuestion, question} = props;
    const {title, answers, answerType, selected, id} = question;

    const [checkedList, setCheckedList] = useState<string[]>([]);
    const [radioValue, setRadioValue] = useState<string>('');

    const onCheckboxChanged = (list: number[]) => {
        question.selected = list;
        onNewQuestion(question);
    };
    const onRadioChanged = (e: RadioChangeEvent) => {
        question.selected = Array.isArray(e.target.value) ? e.target.value : [e.target.value];
        onNewQuestion(question);
    };

    const OptionsRender = () => {
        if (answerType === ANSWER_TYPE.MULTI) {
            return (
                <Checkbox.Group
                    options={answers?.map((optionItem) => optionItem.text) || []}
                    value={question.selected}
                    onChange={onCheckboxChanged}
                />
            );
        }

        return (
            <Radio.Group
                defaultValue={answers?.[0].text}
                value={question.selected?.[0]}
                onChange={onRadioChanged}
            >
                {answers?.map((variant) => {
                    return <Radio.Button value={variant.id}>{variant.text}</Radio.Button>;
                })}
            </Radio.Group>
        );
    };

    return (
        <Card
            title={title}
            bordered={true}
        >
            <Flex
                gap="small"
                wrap
            >
                {<OptionsRender />}
            </Flex>
        </Card>
    );
};

export default Question;
