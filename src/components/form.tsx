import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import SendIcon from '@mui/icons-material/Send'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios'

import { schema, Schema } from '../validations/schema'

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting, isSubmitSuccessful, isSubmitted },
  } = useForm<Schema>({ resolver: zodResolver(schema) })

  const onSubmit: SubmitHandler<Schema> = async data => await axios.post('/api/form', data)
  {
    if (!isSubmitted) {
      return (
        <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Contact Form
          </Typography>
          <TextField
            variant="outlined"
            label="メールアドレス"
            placeholder="example@gmail.com"
            helperText={errors.email?.message}
            {...register('email')}
          />
          <TextField
            variant="outlined"
            label="タイトル"
            placeholder="〇〇について"
            helperText={errors.title?.message}
            {...register('title')}
          />
          <TextField
            variant="outlined"
            label="内容詳細"
            placeholder="〇〇の詳細について教えてください。"
            helperText={errors.inquiry?.message}
            {...register('inquiry')}
            multiline
            rows={8}
          />
          <Button
            variant="contained"
            type="submit"
            endIcon={<SendIcon />}
            disabled={!isDirty || !isValid || isSubmitting}
          >
            送信する
          </Button>
        </Stack>
      )
    } else {
      return (
        <Typography
          variant="h4"
          component="h2"
          align="center"
          gutterBottom
          sx={{ whiteSpace: 'pre-wrap' }}
        >
          {isSubmitSuccessful
            ? `お問い合わせありがとうございます。
          順次お返しいたしますので少々お待ちください。`
            : `送信に失敗しました。
            お手数ですが、再度お問い合わせください。`}
        </Typography>
      )
    }
  }
}
