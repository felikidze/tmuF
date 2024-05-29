import {FC, useState} from 'react';
import {Card, Flex, Divider, Checkbox, Radio, RadioChangeEvent} from 'antd';

interface IQuestionProps {
    title: string;
    description: string;
    options: string[];
    isMulti: boolean;
    questionId: string;
    onResult: (selectedItem: string) => void;
}

const Question: FC<IQuestionProps> = (props) => {
    const {title, description, questionId, isMulti, options, onResult} = props;

    const [checkedList, setCheckedList] = useState<string[]>([]);
    const [radioValue, setRadioValue] = useState<string>('');

    const onCheckboxChanged = (list: string[]) => {
        setCheckedList(list);
    };
    const onRadioChanged = (e: RadioChangeEvent) => {
        setRadioValue(e.target.value);
    };

    const OptionsRender = () => {
        if (isMulti) {
            return (
                <Checkbox.Group
                    options={options.map((optionItem) => optionItem.title)}
                    value={checkedList}
                    onChange={onCheckboxChanged}
                />
            );
        }

        return (
            <Radio.Group
                defaultValue={options[0]?.title}
                value={radioValue}
                onChange={onRadioChanged}
            >
                {options.map((variant) => {
                    return <Radio.Button value={variant.id}>{variant.title}</Radio.Button>;
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
                {description && (
                    <>
                        <p>{description}</p>
                        <Divider />
                    </>
                )}
                {<OptionsRender />}
            </Flex>
        </Card>
    );
};

export default Question;
