import {FC} from 'react';
import {Card, Checkbox, Divider, Flex, Radio, RadioChangeEvent, Space} from 'antd';

import {ANSWER_TYPE, QUESTION_MODEL} from '@models/Question';
import {IProviderProps} from '@context/Context';
import Neuro from '@components/_neuro/Neuro';
import {default as axios} from 'axios';

interface IQuestionProps {
    question: QUESTION_MODEL;
}

const Question: FC<IQuestionProps & Pick<IProviderProps, 'onNewQuestion'>> = (props) => {
    const {onNewQuestion, question} = props;
    const {title, answers, answerType, selected} = question;

    const onCheckboxChanged = (list: number[]) => {
        question.selected = list;
        onNewQuestion?.(question);
    };
    const onRadioChanged = (e: RadioChangeEvent) => {
        question.selected = Array.isArray(e.target.value) ? e.target.value : [e.target.value];
        onNewQuestion?.(question);
    };

    const customUploadImage = async (options) => {
        const {onSuccess, onError, file, onProgress} = options;

        const fmData = new FormData();
        const config = {
            headers: {'content-type': 'multipart/form-data'}
        };
        fmData.append('image', file);
        try {
            const res = await axios.post('http:///172.20.10.3:8888/melanomaAnalyze', fmData, config);

            onSuccess('Ok')
            console.log('server res: ', res);
        } catch (err) {
            console.log('Eroor: ', err);
            onError({err});
        }
    }

    const OptionsRender = () => {
        if (answerType === ANSWER_TYPE.MULTI) {
            return (
                <Checkbox.Group
                    options={answers?.map((optionItem) => optionItem.text) || []}
                    value={selected}
                    onChange={onCheckboxChanged}
                />
            );
        }

        if (answerType === ANSWER_TYPE.IMAGE) {
            return (
                <Neuro
                    customUploadImage={customUploadImage}
                />
            )
        }

        return (
            <Radio.Group
                defaultValue={answers?.[0].text}
                value={selected?.[0]}
                onChange={onRadioChanged}
            >
                <Space direction="vertical" style={{alignItems: 'baseline'}}>
                    {answers?.map((variant) => {
                        return <Radio value={variant.id}>{variant.text}</Radio>;
                    })}
                </Space>
            </Radio.Group>
        );
    };

    const suggestion = answers?.find((el) => el.id === selected?.[0])?.suggestion

    return (
        <Card
            title={title}
            bordered={true}
            style={{width: '100%'}}
        >
            <Flex
                gap="small"
                wrap
            >
                {<OptionsRender />}
                {suggestion && (
                    <>
                        <Divider />
                        {suggestion}
                    </>
                )}
            </Flex>
        </Card>
    );
};

export default Question;
