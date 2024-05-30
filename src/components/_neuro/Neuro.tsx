import {FC, useState} from 'react';

import {Upload} from 'antd';
import type {GetProp, UploadFile, UploadProps} from 'antd';
import ImgCrop from 'antd-img-crop';

import {MAX_UPLOAD_FILES_COUNT} from '@consts';
import {API, API2} from '@/api';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

interface INeuroProps {
    customUploadImage: (options: unknown) => Promise<void>|void;
}

const Neuro: FC<INeuroProps> = (props) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [researchResult, setResearchResult] = useState('');
    const onChange: UploadProps['onChange'] = ({fileList: newFileList}) => {
        // Accept 1 files only
        const fileList = [...newFileList].slice(-1);
        fileList.forEach(function (file) {
            let reader = new FileReader();
            reader.onload = (e) => {
                file.base64 = e.target?.result;
            };
            reader.readAsDataURL(file.originFileObj);
        });
        setFileList(newFileList);
    };

    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as FileType);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const uploadImage = async (options) => {
        const {onSuccess, onError, file, onProgress} = options;

        const fmData = new FormData();
        const config = {
            headers: {'content-type': 'multipart/form-data'}
        };
        fmData.append('image', file);
        try {
            const res = await API2.post('analyze', fmData, config);

            onSuccess('Ok')
            console.log('server res: ', res);
            setResearchResult(res.data?.result);
        } catch (err) {
            console.log('Eroor: ', err);
            onError({err});
            setResearchResult("В процессе анализа изображения произошла ошибка!");
        }
    };

    const onRemove = () => {
        setResearchResult('');
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <ImgCrop rotationSlider>
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    maxCount={MAX_UPLOAD_FILES_COUNT}
                    onChange={onChange}
                    onPreview={onPreview}
                    onRemove={onRemove}
                    customRequest={props.customUploadImage || uploadImage}
                >
                    {fileList.length < 1 && '+ Upload'}
                </Upload>
            </ImgCrop>
            {researchResult && <p>{researchResult}</p>}
        </div>
    );
};

export default Neuro;
